// Gera as quatro texturas PNG do projeto sem baixar imagens da internet.
// O script usa somente módulos que já fazem parte do Node.js.

const { mkdirSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");
const { deflateSync } = require("node:zlib");

// A grama, a água e o logo usam 256 × 256 pixels. A bandeira tem outra proporção.
const tamanho = 256;
const pastaDeSaida = join(__dirname, "..", "texturas");
mkdirSync(pastaDeSaida, { recursive: true });

// O PNG verifica cada bloco com CRC. Esta função calcula esse número.
// Não é uma animação: ela só roda quando geramos os arquivos com Node.js.
function calcularCRC(dados) {
    let crc = 0xffffffff;

    // O operador ^ combina bits; >>> desloca sem preservar sinal.
    for (const byte of dados) {
        crc ^= byte;
        for (let bit = 0; bit < 8; bit++) {
            const mascara = -(crc & 1);
            crc = (crc >>> 1) ^ (0xedb88320 & mascara);
        }
    }

    return (crc ^ 0xffffffff) >>> 0;
}

// Um bloco PNG tem: tamanho dos dados, tipo, dados e número de verificação.
function criarBloco(tipo, dados) {
    const nomeDoTipo = Buffer.from(tipo);
    const tamanhoDosDados = Buffer.alloc(4);
    tamanhoDosDados.writeUInt32BE(dados.length);

    const numeroCRC = Buffer.alloc(4);
    numeroCRC.writeUInt32BE(calcularCRC(Buffer.concat([nomeDoTipo, dados])));

    return Buffer.concat([tamanhoDosDados, nomeDoTipo, dados, numeroCRC]);
}

// escolherCor(x, y) informa a cor de cada pixel, de cima para baixo.
function salvarPNG(nome, largura, altura, escolherCor) {
    // Cada linha começa com zero para indicar que não usa filtro de compressão.
    const pixels = Buffer.alloc((largura * 4 + 1) * altura);

    for (let y = 0; y < altura; y++) {
        const inicioDaLinha = y * (largura * 4 + 1);
        pixels[inicioDaLinha] = 0;

        for (let x = 0; x < largura; x++) {
            // Cada pixel ocupa quatro posições: vermelho, verde, azul e opacidade.
            const [vermelho, verde, azul, alpha = 255] = escolherCor(x, y);
            const indice = inicioDaLinha + 1 + x * 4;
            pixels[indice] = vermelho;
            pixels[indice + 1] = verde;
            pixels[indice + 2] = azul;
            pixels[indice + 3] = alpha;
        }
    }

    // IHDR registra largura, altura, 8 bits por canal e cor RGBA (tipo 6).
    const cabecalho = Buffer.alloc(13);
    cabecalho.writeUInt32BE(largura, 0);
    cabecalho.writeUInt32BE(altura, 4);
    cabecalho[8] = 8;
    cabecalho[9] = 6;

    // A assinatura identifica o PNG; IDAT contém os pixels comprimidos.
    const arquivo = Buffer.concat([
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
        criarBloco("IHDR", cabecalho),
        criarBloco("IDAT", deflateSync(pixels)),
        criarBloco("IEND", Buffer.alloc(0))
    ]);

    writeFileSync(join(pastaDeSaida, nome), arquivo);
}

// Frequências diferentes deixam a grama irregular, mas ainda repetível nas bordas.
// u e v variam de 0 até quase 1; os senos completam voltas inteiras na imagem.
salvarPNG("grama.png", tamanho, tamanho, (x, y) => {
    const u = x / tamanho;
    const v = y / tamanho;
    const detalheA = Math.sin(u * Math.PI * 14 + Math.cos(v * Math.PI * 10));
    const detalheB = Math.cos(v * Math.PI * 22 + Math.sin(u * Math.PI * 6));
    const detalheC = Math.sin((u + v) * Math.PI * 8);
    // Uma mudança pequena nos três canais dá detalhe sem manchar o gramado.
    const variacao = Math.round(detalheA * 3 + detalheB * 2 + detalheC * 2);
    return [69 + variacao, 139 + variacao, 75 + variacao];
});

// Ondas cruzadas e pouco contraste evitam o efeito de listras marcadas.
// As frequências pares fazem a borda direita continuar na borda esquerda.
salvarPNG("agua.png", tamanho, tamanho, (x, y) => {
    const u = x / tamanho;
    const v = y / tamanho;
    const ondaA = Math.sin(u * Math.PI * 6 + Math.sin(v * Math.PI * 4) * 1.3);
    const ondaB = Math.cos(v * Math.PI * 8 + Math.sin(u * Math.PI * 4));
    const ondaC = Math.sin((u + v) * Math.PI * 10);
    const brilho = Math.round(ondaA * 3 + ondaB * 3 + ondaC);
    return [46 + brilho, 149 + brilho, 198 + brilho];
});

// Esta é a imagem da placa da sede; o 40 clicável do portal é geometria 3D.
salvarPNG("logo40.png", tamanho, tamanho, (x, y) => {
    const centroX = tamanho / 2;
    const centroY = tamanho / 2;
    const distancia = Math.hypot(x - centroX, y - centroY);
    const dentroDoCirculo = distancia < 112;

    // O 4 é formado por três faixas e o 0 por uma borda oval.
    const quatro =
        (x > 65 && x < 82 && y > 65 && y < 188) ||
        (x > 30 && x < 105 && y > 125 && y < 143) ||
        (x > 38 && x < 54 && y > 73 && y < 138);
    // A diferença entre duas elipses preenchidas forma apenas o contorno do 0.
    const ovalExterno = Math.pow((x - 163) / 48, 2) + Math.pow((y - 128) / 70, 2) < 1;
    const ovalInterno = Math.pow((x - 163) / 27, 2) + Math.pow((y - 128) / 48, 2) < 1;
    const zero = ovalExterno && !ovalInterno;

    // A ordem importa: números amarelos sobre círculo verde e fundo claro.
    if (quatro || zero) return [255, 220, 55];
    if (dentroDoCirculo) return [32, 148, 71];
    return [246, 244, 232];
});

// A bandeira usa somente as três formas principais: campo, losango e círculo.
const larguraBandeira = 320;
const alturaBandeira = 180;

salvarPNG("bandeira.png", larguraBandeira, alturaBandeira, (x, y) => {
    const centroX = larguraBandeira / 2;
    const centroY = alturaBandeira / 2;
    // Somar as distâncias normalizadas aos eixos desenha o losango.
    const dentroDoLosango =
        Math.abs(x - centroX) / 130 + Math.abs(y - centroY) / 70 <= 1;
    const dentroDoCirculo = Math.hypot(x - centroX, y - centroY) <= 45;

    if (dentroDoCirculo) return [0, 39, 118];
    if (dentroDoLosango) return [255, 223, 0];
    return [0, 156, 59];
});
