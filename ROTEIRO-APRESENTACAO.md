# Roteiro de apresentação — Clube dos 40

Tempo previsto: 4 minutos, cerca de 1 minuto e 20 segundos para cada integrante. A divisão segue as seções numeradas do `index.html`: cada um é responsável por seções inteiras e seguidas, e as perguntas prováveis também foram divididas pelas seções de cada um.

| Integrante | Seções do `index.html` | Linhas | Tempo |
|---|---|---|---|
| Tiago | 1 a 4 | 252 a 445 | 0:00 a 1:20 |
| Raphael | 4.1 a 7 | 447 a 642 | 1:20 a 2:40 |
| Herick | 8 a 10 | 644 a 869 | 2:40 a 4:00 |

O guia de estudo, com o código completo de cada seção, fica em `guia-de-estudo.pdf`, na pasta do projeto no vault.

## 1. Tiago — seções 1 a 4 (0:00 a 1:20)

1. Apresente o tema: “Evoluímos a Mini Aperibé para uma representação interativa do Clube dos 40, clube recreativo de Aperibé.”
2. Mostre a vista de chegada: portal com o logo 40, duas piscinas, quadra, campo, banheiro, bancos e sede.
3. **Seção 1:** `Scene` guarda os objetos, `PerspectiveCamera` é o ponto de vista e `WebGLRenderer` desenha no `canvas`. A posição da câmera vem de dois ângulos e uma distância, convertidos com seno e cosseno.
4. **Seção 2:** `TextureLoader` carrega as imagens; `wrapS`, `wrapT` e `repeat.set(12, 10)` repetem a grama. A função `adicionar` cria o `Mesh`, posiciona e adiciona à cena.
5. **Seção 3:** o terreno é um plano deitado com `rotation.x`; sede e piscinas são caixas, cones e cilindros.
6. **Seção 4:** as linhas da quadra e do campo são caixas finas criadas por um `for` sobre uma lista, e `criarGol` monta os dois gols.

Frase de passagem: “O Raphael continua a construção do clube.”

## 2. Raphael — seções 4.1 a 7 (1:20 a 2:40)

1. **Seção 4.1:** banheiro com caixas e cone; `criarBanco` cria os dois bancos.
2. **Seção 5:** a portaria e o logo 40.
   - o 4 tem três caixas; a diagonal liga dois pontos, com `Math.hypot` para o comprimento e `Math.atan2` para a inclinação;
   - o 0 são 28 caixas num `for`: `Math.cos()` calcula X e `Math.sin()` calcula Y;
   - todas as peças usam o mesmo material e ficam na lista `pecasDoLogo`.
3. **Seção 6:** as árvores vêm de uma lista de posições; a pessoa é um `Group` de 15 peças que se movem juntas; a bandeira usa `DoubleSide`.
4. **Seção 7:** cada nuvem é um `Group` de três esferas; `AmbientLight` clareia tudo e `DirectionalLight` faz o papel do sol.

Frase de passagem: “Com o clube montado, o Herick mostra como o usuário interage e o que se mexe.”

## 3. Herick — seções 8 a 10 (2:40 a 4:00)

1. Demonstre W, A, S e D, o Espaço para pular, o arrasto da câmera e o clique no logo.
2. **Seção 8:** `keydown` marca a tecla como verdadeira e `keyup` volta para falsa. `moverPessoa` anda na direção das teclas, vira com `Math.atan2` e não sai do terreno por causa do `clamp`. O pulo usa meio ciclo de `Math.sin()`.
3. **Seção 9:** arrastar muda os ângulos da câmera. No clique, o mouse vira um valor entre -1 e 1, `setFromCamera()` cria o raio, `intersectObjects()` testa as peças do logo e `emissive` acende.
4. **Seção 10:** `setAnimationLoop` chama `animar` a cada quadro; `delta` move a pessoa e as nuvens, e `elapsedTime` com `Math.sin()` balança a bandeira e a água.
5. Feche citando os números: 118 Meshes, 5 tipos de geometria, 4 texturas e 4 animações.

---

## Perguntas prováveis do professor, por integrante

Cada um estuda primeiro as perguntas das próprias seções. O professor pode perguntar qualquer coisa a qualquer um, então vale ler as dos outros depois.

## Perguntas do Tiago — seções 1 a 4 (12)

### O que são Scene, Camera e Renderer?

`Scene` é o contêiner dos objetos, luzes e grupos. `Camera` define de onde a cena é observada. `Renderer` transforma essas informações em pixels no canvas.

### Por que a câmera está nessa posição?

Dois ângulos e uma distância definem a posição da câmera. `lookAt(centroDaCamera)` a mantém apontada para o clube. O arrasto muda os ângulos; a roda muda a distância.

### O que é Geometry, Material e Mesh?

`Geometry` define a forma e os vértices. `Material` define a aparência. `Mesh` junta os dois para formar um objeto visível.

### O que position, rotation e scale fazem?

`position` move o objeto nos eixos X, Y e Z. `rotation` gira o objeto em radianos. `scale` altera suas proporções.

### O que a função adicionar faz?

Todo objeto passa pelos mesmos três passos: `new THREE.Mesh(geometria, material)`, `position.set(x, y, z)` e `scene.add(...)`. A função `adicionar` faz os três e devolve o Mesh, para que ainda dê para mudar `rotation` ou `scale` depois. O último parâmetro, `pai`, vale `scene` por padrão; nas partes da pessoa e das nuvens ele recebe o `Group`, então a peça entra no grupo em vez da cena.

### Por que várias peças usam a mesma geometria?

As 28 peças do zero, as 8 árvores e os postes têm formas idênticas. Criar uma geometria só e passar para vários Meshes economiza memória: a forma fica guardada uma vez, e cada Mesh tem só a própria posição, rotação e escala.

### O que o repeat faz na textura?

Ele repete a imagem em vez de esticá-la uma única vez. `repeat.set(12, 10)` desenha doze repetições no eixo horizontal e dez no vertical, cobrindo o terreno maior.

### Por que configurar wrapS e wrapT?

Essas propriedades autorizam a repetição da textura nos dois eixos. `S` corresponde ao horizontal e `T` ao vertical.

### Qual é a diferença entre raster e vetor?

Raster é uma imagem formada por uma grade de pixels, como os PNGs das texturas. Vetor descreve formas matematicamente e pode aumentar de tamanho sem perder nitidez.

### Por que abrir com servidor local?

O navegador aplica regras de segurança a módulos e arquivos carregados. O servidor entrega o HTML, o módulo e as texturas por HTTP, evitando bloqueios de arquivos locais.

### Como é feita a piscina redonda?

Dois cilindros bem baixos, um branco e outro com a textura da água, formam borda e superfície. A superfície varia um pouco de altura no loop de animação.

### Como foram feitas as linhas da quadra e do campo?

Cada linha é uma `BoxGeometry` bem fina e branca. Os dois `for` percorrem as listas de posições e tamanhos: cinco caixas marcam a quadra (quatro bordas e a linha central) e cinco marcam o campo.

## Perguntas do Raphael — seções 4.1 a 7 (11)

### Onde alterar manualmente o 4?

Procure `AJUSTE MANUAL DO NÚMERO 4` em `index.html`. A primeira chamada de `adicionarPecaDoQuatro` é a haste vertical, a segunda é a barra horizontal e a terceira é a diagonal. `Vector2` controla largura e altura; `Vector3` controla X, Y e Z (o centro da barra); o último valor controla a rotação em radianos. A diagonal não tem ângulo digitado à mão: ela liga dois pontos, a ponta esquerda da barra e o topo da haste. `Math.hypot` calcula o comprimento entre eles e `Math.atan2` calcula a inclinação. Para mexer na diagonal, mude esses dois pontos. O Z igual a `6.34` mantém as barras visíveis à frente da placa.

### Como as 28 caixas do zero são criadas?

Um `for` roda 28 vezes. A cada volta ele calcula um ângulo, cria um `Mesh` de `BoxGeometry` e o posiciona na borda da circunferência. Todas compartilham o mesmo material, por isso acendem juntas.

### Como Math.cos() e Math.sin() formam o zero?

Para cada ângulo, o cosseno calcula a coordenada X e o seno calcula Y. Multiplicar pelo raio coloca cada caixa na borda da circunferência.

### Por que a pessoa é um Group?

Porque camiseta, bermuda, cabeça, cabelo, olhos, braços, mãos, pernas e tênis são meshes separados. Ao mover o grupo, todas as 15 partes se movem juntas.

### Como a bandeira do Brasil foi feita?

O script gera um PNG com fundo verde, losango amarelo e círculo azul. O `TextureLoader` carrega esse arquivo e o `map` aplica a imagem ao plano da bandeira.

### Por que a bandeira usa DoubleSide?

Um plano normalmente aparece apenas pelo lado da frente. `THREE.DoubleSide` permite enxergar a textura também quando a câmera olha o verso da bandeira.

### Como as nuvens deixaram de ser ovais?

Cada nuvem é um `Group` com três esferas de tamanhos e alturas diferentes. Mover o grupo faz os três volumes viajarem juntos. Há seis grupos espalhados sobre o terreno.

### Para que servem AmbientLight e DirectionalLight?

`AmbientLight` clareia todos os objetos de maneira geral. `DirectionalLight` simula uma luz vinda de uma direção, como o sol.

### Por que MeshStandardMaterial precisa de luz?

Porque ele calcula como a luz bate na superfície. Sem uma luz na cena, esse material fica escuro.

### O que emissive e emissiveIntensity fazem?

`emissive` define a cor que parece sair do próprio material. `emissiveIntensity` controla a força desse brilho.

### Por que usar Math.sin()?

O seno varia suavemente entre -1 e 1. Isso produz um movimento de ida e volta sem criar várias condições.

## Perguntas do Herick — seções 8 a 10 (11)

### Como funciona o pulo?

Espaço inicia o pulo. No loop, `tempoDoPulo` cresce com `delta`; meio ciclo de `Math.sin()` eleva a pessoa e a traz de volta ao chão em 0,8 segundo.

### Como a pessoa vira para onde está andando?

As teclas viram duas direções, `direcaoX` e `direcaoZ`, que valem -1, 0 ou 1. O boneco foi montado com o rosto para +Z, e `Math.atan2(direcaoX, direcaoZ)` devolve o ângulo de `rotation.y` que aponta o rosto para essa direção: D dá 90°, W dá 180°, e W+D dá 135°, a diagonal. Parado, as duas direções são zero, então o ângulo não é recalculado e o boneco continua olhando para onde ia.

### O que acontece se a janela perder o foco com uma tecla apertada?

O `keyup` nunca chegaria e a pessoa andaria sozinha. O evento `blur` da janela solta todas as teclas. E o `delta` é limitado a 0,05 segundo com `Math.min`: ao voltar de outra aba, ele viria com vários segundos de uma vez e a pessoa daria um salto.

### O que o Raycaster faz?

Ele lança um raio imaginário da câmera na direção do mouse e informa quais objetos 3D foram atingidos.

### Por que converter o mouse para o intervalo de -1 a 1?

Esse é o sistema de coordenadas normalizadas que o Three.js espera em `setFromCamera()`, independentemente do tamanho do canvas.

### Por que arrastar não acende o 40?

O código mede quanto o ponteiro se moveu. Se passou de cinco pixels, foi um arrasto e o clique seguinte não usa o `Raycaster`.

### Por que setAnimationLoop em vez de renderizar uma vez?

Porque animações e movimento precisam atualizar posições e redesenhar a cena continuamente. Uma renderização única mostraria apenas uma imagem parada.

### O que é FPS?

É a quantidade de quadros desenhados por segundo. Quanto maior o FPS, mais contínuo parece o movimento.

### O que é elapsedTime?

É o tempo total, em segundos, desde o início do relógio. Como depende do tempo e não da quantidade de quadros, a animação mantém o ritmo em computadores diferentes.

### Qual é a diferença entre delta e elapsedTime?

`delta` é o tempo entre o quadro atual e o anterior, usado para calcular deslocamento. `elapsedTime` é o tempo acumulado, útil para movimentos periódicos como `Math.sin()`.

### Como esconder o painel aumenta a área da cena?

O botão acrescenta ou remove a classe CSS `painel-oculto` na aplicação. A classe esconde o painel e dá toda a largura ao canvas; `atualizarTamanho()` corrige o tamanho do renderer e a proporção da câmera.
