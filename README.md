# Clube dos 40 · Aperibé

## Integrantes

- Tiago Abreu Novaes — 2625924
- Raphael Galiaço da Cunha — 2631785
- Herick Luccas Lemos Rocha — 2663928

## Descrição da cena

O projeto representa o **Clube dos 40**, de Aperibé/RJ, em uma cena 3D interativa. A composição possui sede, piscina com deck, quadra, campo de futebol ao fundo, portal de entrada, árvores, bandeira e uma pessoa controlada pelo teclado.

O logo “40” aparece na placa acima do portal por onde passam pessoas e carros. O número 4 é formado por três caixas. O número 0 usa 14 instâncias de uma caixa, posicionadas em círculo com `Math.cos()` e `Math.sin()`. Ao clicar na placa ou nas peças do logo, o material alterna entre apagado e aceso.

## Tecnologias utilizadas

- HTML5 e CSS3;
- JavaScript com módulos ES;
- Three.js 0.179.1 pelo CDN jsDelivr;
- Node.js apenas para gerar os arquivos PNG das texturas.

Não há framework, ferramenta de build, modelo 3D externo nem biblioteca adicional.

## Geometrias e transformações

Foram usados cinco tipos de geometria:

- `PlaneGeometry`: terreno, água e bandeira;
- `BoxGeometry`: sede, deck, piscina, quadra, campo, portal, pista, placa e logo;
- `ConeGeometry`: telhado da sede;
- `CylinderGeometry`: postes, gols, troncos, pessoa e mastro;
- `SphereGeometry`: copas, cabeça e nuvens.

Os objetos usam `position` para ocupar pontos diferentes dos eixos X, Y e Z, `rotation` para inclinar planos e orientar peças, e `scale` para achatar as nuvens.

## Números da cena

- **35 Meshes:** a contagem considera o `InstancedMesh` do zero como um Mesh que desenha 14 instâncias;
- **5 tipos de geometria;**
- **3 texturas locais:** grama, água e logo da portaria;
- **3 animações:** nuvens, bandeira e água.

## Conferência dos requisitos

| Requisito | Como foi atendido |
| --- | --- |
| Cena 3D funcional | `Scene`, `PerspectiveCamera` e `WebGLRenderer` formam a base da aplicação. |
| Composição própria | A cena representa o Clube dos 40 com sede, piscina, quadra e campo. |
| Geometrias e transformações | Há cinco geometrias e usos claros de `position`, `rotation` e `scale`. |
| Iluminação | `AmbientLight` ilumina o conjunto e `DirectionalLight` representa o sol. |
| Pelo menos duas texturas | `grama.png`, `agua.png` e `logo40.png` são carregadas com `TextureLoader` e usadas em `map`. |
| Pelo menos duas animações | Nuvens usam o tempo entre quadros; bandeira e água usam `Math.sin()` com o tempo decorrido. |
| Interação por teclado | W e S movem no eixo Z; A e D movem no eixo X. A posição é limitada ao terreno. |
| Interação com Raycaster | O clique no logo usa `setFromCamera()` e `intersectObjects()` para ligar ou desligar sua emissão de luz. |
| Código organizado | O JavaScript está dividido em dez seções numeradas, com comentários em português. |

## Estrutura do projeto

```text
projeto/
├── ferramentas/
│   └── gerar_texturas.js
├── texturas/
│   ├── agua.png
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
- clique no “40” da placa de entrada: acender ou apagar o logo.
