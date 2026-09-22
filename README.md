# Clube dos 40 · Aperibé

## Integrantes

- Tiago Abreu Novaes — 2625924
- Raphael Galiaço da Cunha — 2631785
- Herick Luccas Lemos Rocha — 2663928

## Descrição da cena

O projeto representa o **Clube dos 40**, de Aperibé/RJ, em uma cena 3D interativa. O terreno de 30 × 24 unidades mostra o portal na frente, duas piscinas (uma redonda), quadra, campo, sede, banheiro, bancos, árvores e bandeira do Brasil. Uma pessoa controlada pelo teclado passeia pelo clube.

O logo “40” aparece na placa acima do portal por onde passam pessoas e carros. O número 4 usa uma diagonal, uma barra horizontal e uma haste vertical, feitas com três caixas. O número 0 usa 28 meshes de caixa, posicionados em círculo com `Math.cos()` e `Math.sin()`. Ao clicar na placa ou nas peças do logo, o material alterna entre apagado e aceso.

## Tecnologias utilizadas

- HTML5 e CSS3;
- JavaScript com módulos ES;
- Three.js 0.179.1 pelo CDN jsDelivr;
- Node.js apenas para gerar os arquivos PNG das texturas.

Não há framework, ferramenta de build, modelo 3D externo nem biblioteca adicional.

## Geometrias e transformações

Foram usados cinco tipos de geometria:

- `PlaneGeometry`: terreno, água da piscina principal e bandeira;
- `BoxGeometry`: sede, banheiro, deck, bancos, quadra, campo, portal, pista, placa, logo e roupas da pessoa;
- `ConeGeometry`: telhados e árvores;
- `CylinderGeometry`: postes, gols, piscina redonda, braços, pernas e mastro;
- `SphereGeometry`: cabeça, olhos, mãos e volumes das nuvens.

Os objetos usam `position` para ocupar pontos diferentes dos eixos X, Y e Z, `rotation` para inclinar planos e orientar peças, e `scale` para achatar as nuvens.

Quase todos os Meshes são criados pela função `adicionar(geometria, material, x, y, z, pai)`, que junta os três passos repetidos (criar o Mesh, posicionar e adicionar à cena ou a um `Group`). Peças de forma idêntica, como as 28 do zero e as 8 árvores, compartilham uma única geometria.

## Números da cena

- **118 Meshes:** o zero do logo usa 28 caixas, as seis nuvens usam três volumes cada, e a pessoa tem 15 partes;
- **5 tipos de geometria;**
- **4 texturas locais:** grama, água, logo na placa da sede e bandeira do Brasil;
- **4 animações:** nuvens, bandeira, água e pulo da pessoa.

## Conferência dos requisitos

| Requisito | Como foi atendido |
| --- | --- |
| Cena 3D funcional | `Scene`, `PerspectiveCamera` e `WebGLRenderer` formam a base da aplicação. |
| Composição própria | A cena representa o Clube dos 40 com sede, duas piscinas, quadra, campo, banheiro e bancos. |
| Geometrias e transformações | Há cinco geometrias e usos claros de `position`, `rotation` e `scale`. Caixas finas marcam a quadra e o campo. |
| Iluminação | `AmbientLight` ilumina o conjunto e `DirectionalLight` representa o sol. |
| Pelo menos duas texturas | `grama.png`, `agua.png`, `logo40.png` e `bandeira.png` são carregadas com `TextureLoader` e usadas em `map`. |
| Pelo menos duas animações | Nuvens usam o tempo entre quadros; bandeira e água usam `Math.sin()` com o tempo decorrido; a pessoa pula com meio ciclo de seno. |
| Interação por teclado | W e S movem no eixo Z; A e D movem no eixo X; Espaço faz a pessoa pular. A posição horizontal é limitada ao terreno. |
| Interação com Raycaster | O clique no logo usa `setFromCamera()` e `intersectObjects()` para ligar ou desligar sua emissão de luz. |
| Código organizado | O JavaScript está dividido em dez seções numeradas, com comentários em português e um guia no trecho `AJUSTE MANUAL DO NÚMERO 4`. |

## Estrutura do projeto

```text
projeto/
├── ferramentas/
│   └── gerar_texturas.js
├── texturas/
│   ├── agua.png
│   ├── bandeira.png
│   ├── grama.png
│   └── logo40.png
├── index.html
├── README.md
└── ROTEIRO-APRESENTACAO.md
```

## Como executar

As texturas e o módulo do Three.js precisam de um servidor local. Dentro da pasta `projeto`, execute:

```bash
python -m http.server 8000
```

Depois, abra `http://localhost:8000` no navegador. Também é possível usar a extensão **Live Server** do Visual Studio Code.

É necessário acesso à internet para carregar o Three.js pelo CDN. Os arquivos de textura ficam no próprio projeto.

Para gerar novamente as texturas, execute:

```bash
node ferramentas/gerar_texturas.js
```

## Controles

- `W`: andar para o fundo;
- `S`: andar para a frente;
- `A`: andar para a esquerda;
- `D`: andar para a direita;
- `Espaço`: pular;
- arrastar sobre a cena: girar a câmera ao redor do clube;
- roda do mouse: aproximar ou afastar a câmera;
- clique no “40” da placa de entrada: acender ou apagar o logo.
- botão “Ocultar painel”: expandir a cena; “Mostrar painel” traz as informações de volta.

## Onde modificar o 4

Procure `AJUSTE MANUAL DO NÚMERO 4` em `index.html`. A primeira chamada de `adicionarPecaDoQuatro` é a haste vertical, a segunda é a barra horizontal e a terceira é a diagonal. `Vector2` controla largura e altura; `Vector3` controla X, Y e Z (o centro da barra); o último valor controla a rotação em radianos. A diagonal não tem ângulo digitado à mão: ela liga dois pontos, a ponta esquerda da barra e o topo da haste. `Math.hypot` calcula o comprimento entre eles e `Math.atan2` calcula a inclinação. Para mexer na diagonal, mude esses dois pontos. O Z igual a `6.34` mantém as barras visíveis à frente da placa.
