// Gera as três texturas PNG do projeto sem baixar imagens da internet.
// O script usa somente módulos que já fazem parte do Node.js.

const { mkdirSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");
const { deflateSync } = require("node:zlib");

const tamanho = 256;
const pastaDeSaida = join(__dirname, "..", "texturas");
mkdirSync(pastaDeSaida, { recursive: true });

// O PNG verifica cada bloco com CRC. Esta função calcula esse número.
function calcularCRC(dados) {
    let crc = 0xffffffff;

    for (const byte of dados) {
        crc ^= byte;
        for (let bit = 0; bit < 8; bit++) {
            const mascara = -(crc & 1);
            crc = (crc >>> 1) ^ (0xedb88320 & mascara);
        }
    }

    return (crc ^ 0xffffffff) >>> 0;
}

function criarBloco(tipo, dados) {
    const nomeDoTipo = Buffer.from(tipo);
    const tamanhoDosDados = Buffer.alloc(4);
    tamanhoDosDados.writeUInt32BE(dados.length);

    const numeroCRC = Buffer.alloc(4);
    numeroCRC.writeUInt32BE(calcularCRC(Buffer.concat([nomeDoTipo, dados])));

    return Buffer.concat([tamanhoDosDados, nomeDoTipo, dados, numeroCRC]);
}

function salvarPNG(nome, escolherCor) {
    // Cada linha começa com zero para indicar que não usa filtro de compressão.
    const pixels = Buffer.alloc((tamanho * 4 + 1) * tamanho);

    for (let y = 0; y < tamanho; y++) {
        const inicioDaLinha = y * (tamanho * 4 + 1);
        pixels[inicioDaLinha] = 0;

        for (let x = 0; x < tamanho; x++) {
            const [vermelho, verde, azul, alpha = 255] = escolherCor(x, y);
            const indice = inicioDaLinha + 1 + x * 4;
            pixels[indice] = vermelho;
            pixels[indice + 1] = verde;
            pixels[indice + 2] = azul;
            pixels[indice + 3] = alpha;
        }
    }

    const cabecalho = Buffer.alloc(13);
    cabecalho.writeUInt32BE(tamanho, 0);
    cabecalho.writeUInt32BE(tamanho, 4);
    cabecalho[8] = 8;
    cabecalho[9] = 6;

    const arquivo = Buffer.concat([
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
        criarBloco("IHDR", cabecalho),
        criarBloco("IDAT", deflateSync(pixels)),
        criarBloco("IEND", Buffer.alloc(0))
    ]);

    writeFileSync(join(pastaDeSaida, nome), arquivo);
}

// Seno e cosseno criam variações que se repetem nas bordas da textura.
salvarPNG("grama.png", (x, y) => {
    const ondaX = Math.sin((x / tamanho) * Math.PI * 16);
    const ondaY = Math.cos((y / tamanho) * Math.PI * 20);
    const variacao = Math.round((ondaX + ondaY) * 7);
    return [70 + variacao, 143 + variacao, 78 + variacao];
});

salvarPNG("agua.png", (x, y) => {
    const onda = Math.sin((x / tamanho) * Math.PI * 8 + (y / tamanho) * Math.PI * 12);
    const brilho = Math.round(onda * 18);
    return [50 + brilho, 154 + brilho, 205 + brilho];
});

salvarPNG("logo40.png", (x, y) => {
    const centroX = tamanho / 2;
    const centroY = tamanho / 2;
    const distancia = Math.hypot(x - centroX, y - centroY);
    const dentroDoCirculo = distancia < 112;

    // O 4 é formado por três faixas e o 0 por uma borda oval.
    const quatro =
        (x > 65 && x < 82 && y > 65 && y < 188) ||
        (x > 30 && x < 105 && y > 125 && y < 143) ||
        (x > 38 && x < 54 && y > 73 && y < 138);
    const ovalExterno = Math.pow((x - 163) / 48, 2) + Math.pow((y - 128) / 70, 2) < 1;
    const ovalInterno = Math.pow((x - 163) / 27, 2) + Math.pow((y - 128) / 48, 2) < 1;
    const zero = ovalExterno && !ovalInterno;

    if (quatro || zero) return [255, 220, 55];
    if (dentroDoCirculo) return [32, 148, 71];
    return [246, 244, 232];
});
