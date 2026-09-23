# Roteiro de apresentação — Clube dos 40

Tempo previsto: 4 minutos, divididos igualmente: cerca de 1 minuto e 20 segundos para cada integrante. Cada um explica um terço do código e estuda um terço das perguntas (11, 12 e 11), com partes fáceis e difíceis para todos.

## 1. Tiago — tema, base do Three.js e texturas (0:00 a 1:20)

1. Apresente o tema: “Evoluímos a Mini Aperibé para uma representação interativa do Clube dos 40, clube recreativo de Aperibé.”
2. Mostre a vista de chegada: portal com o logo 40, duas piscinas, quadra, campo, banheiro, bancos e sede.
3. Abra a seção 1 do código e explique:
   - `Scene` guarda todos os elementos 3D;
   - `PerspectiveCamera` define o ponto de vista com profundidade;
   - `WebGLRenderer` desenha a cena no `canvas`.
4. Abra a seção 2:
   - todo `Mesh` combina uma geometria (a forma) e um material (a aparência);
   - a função `adicionar` cria o `Mesh`, posiciona e adiciona à cena em uma linha;
   - o `TextureLoader` carrega as imagens, e `wrapS`, `wrapT` e `repeat.set(12, 10)` repetem a grama pelo terreno.

Frase de passagem: “Com a base pronta, o Raphael mostra os objetos e o que se mexe na cena.”

## 2. Raphael — objetos, logo e animações (1:20 a 2:40)

1. Mostre sede, piscinas, quadra, campo, gols e árvores. As linhas brancas são caixas bem finas, criadas por um `for` sobre uma lista.
2. Mostre o logo 40:
   - o 4 tem três `BoxGeometry`: haste vertical, barra horizontal e diagonal;
   - a diagonal liga dois pontos: `Math.hypot` dá o comprimento e `Math.atan2` dá a inclinação;
   - o 0 repete uma caixa 28 vezes dentro de um `for`;
   - a cada volta, `Math.cos()` calcula X e `Math.sin()` calcula Y.
3. Abra o loop de animação:
   - as seis nuvens são `Group`s de três esferas que andam em X, usando `delta`;
   - a bandeira oscila com `Math.sin()` e `elapsedTime`;
   - a água das piscinas sobe e desce levemente.

Frase de passagem: “Além de animar a cena, usamos teclado e mouse para o usuário participar. Quem mostra é o Herick.”

## 3. Herick — interações e fechamento (2:40 a 4:00)

1. Demonstre W, A, S e D movendo a pessoa, Espaço fazendo-a pular e o arrasto girando a câmera.
2. Explique o teclado:
   - `keydown` marca a tecla como verdadeira e `keyup` volta para falsa;
   - `THREE.MathUtils.clamp` impede a pessoa de sair do terreno;
   - `Math.atan2` vira o rosto dela para onde anda.
3. Clique no logo 40 para acender e apagar, e explique o caminho do clique:
   - a coordenada do mouse vira um valor entre -1 e 1;
   - `setFromCamera()` cria o raio a partir da câmera;
   - `intersectObjects()` verifica se uma peça do logo foi atingida;
   - `emissive` faz o material parecer aceso.
4. Feche citando os números: 118 Meshes, 5 tipos de geometria, 4 texturas e 4 animações.

---

## Perguntas prováveis do professor, por integrante

Cada um estuda primeiro as próprias perguntas. O professor pode perguntar qualquer coisa a qualquer um, então vale ler as dos outros depois.

## Perguntas do Tiago — base do Three.js, materiais e texturas (11)

### O que são Scene, Camera e Renderer?

`Scene` é o contêiner dos objetos, luzes e grupos. `Camera` define de onde a cena é observada. `Renderer` transforma essas informações em pixels no canvas.

### O que é Geometry, Material e Mesh?

`Geometry` define a forma e os vértices. `Material` define a aparência. `Mesh` junta os dois para formar um objeto visível.

### O que position, rotation e scale fazem?

`position` move o objeto nos eixos X, Y e Z. `rotation` gira o objeto em radianos. `scale` altera suas proporções.

### O que a função adicionar faz?

Todo objeto passa pelos mesmos três passos: `new THREE.Mesh(geometria, material)`, `position.set(x, y, z)` e `scene.add(...)`. A função `adicionar` faz os três e devolve o Mesh, para que ainda dê para mudar `rotation` ou `scale` depois. O último parâmetro, `pai`, vale `scene` por padrão; nas partes da pessoa e das nuvens ele recebe o `Group`, então a peça entra no grupo em vez da cena.

### Por que várias peças usam a mesma geometria?

As 28 peças do zero, as 8 árvores e os postes têm formas idênticas. Criar uma geometria só e passar para vários Meshes economiza memória: a forma fica guardada uma vez, e cada Mesh tem só a própria posição, rotação e escala.

### Por que MeshStandardMaterial precisa de luz?

Porque ele calcula como a luz bate na superfície. Sem uma luz na cena, esse material fica escuro.

### Para que servem AmbientLight e DirectionalLight?

`AmbientLight` clareia todos os objetos de maneira geral. `DirectionalLight` simula uma luz vinda de uma direção, como o sol.

### O que o repeat faz na textura?

Ele repete a imagem em vez de esticá-la uma única vez. `repeat.set(12, 10)` desenha doze repetições no eixo horizontal e dez no vertical, cobrindo o terreno maior.

### Por que configurar wrapS e wrapT?

Essas propriedades autorizam a repetição da textura nos dois eixos. `S` corresponde ao horizontal e `T` ao vertical.

### Qual é a diferença entre raster e vetor?

Raster é uma imagem formada por uma grade de pixels, como os PNGs das texturas. Vetor descreve formas matematicamente e pode aumentar de tamanho sem perder nitidez.

### Por que abrir com servidor local?

O navegador aplica regras de segurança a módulos e arquivos carregados. O servidor entrega o HTML, o módulo e as texturas por HTTP, evitando bloqueios de arquivos locais.

## Perguntas do Raphael — objetos, logo e animações (12)

### Como foram feitas as linhas da quadra e do campo?

Cada linha é uma `BoxGeometry` bem fina e branca. Os dois `for` percorrem as listas de posições e tamanhos: cinco caixas marcam a quadra (quatro bordas e a linha central) e cinco marcam o campo.

### Como a bandeira do Brasil foi feita?

O script gera um PNG com fundo verde, losango amarelo e círculo azul. O `TextureLoader` carrega esse arquivo e o `map` aplica a imagem ao plano da bandeira.

### Por que a bandeira usa DoubleSide?

Um plano normalmente aparece apenas pelo lado da frente. `THREE.DoubleSide` permite enxergar a textura também quando a câmera olha o verso da bandeira.

### Como é feita a piscina redonda?

Dois cilindros bem baixos, um branco e outro com a textura da água, formam borda e superfície. A superfície varia um pouco de altura no loop de animação.

### Por que a pessoa é um Group?

Porque camiseta, bermuda, cabeça, cabelo, olhos, braços, mãos, pernas e tênis são meshes separados. Ao mover o grupo, todas as 15 partes se movem juntas.

### Como as nuvens deixaram de ser ovais?

Cada nuvem é um `Group` com três esferas de tamanhos e alturas diferentes. Mover o grupo faz os três volumes viajarem juntos. Há seis grupos espalhados sobre o terreno.

### Onde alterar manualmente o 4?

Procure `AJUSTE MANUAL DO NÚMERO 4` em `index.html`. A primeira chamada de `adicionarPecaDoQuatro` é a haste vertical, a segunda é a barra horizontal e a terceira é a diagonal. `Vector2` controla largura e altura; `Vector3` controla X, Y e Z (o centro da barra); o último valor controla a rotação em radianos. A diagonal não tem ângulo digitado à mão: ela liga dois pontos, a ponta esquerda da barra e o topo da haste. `Math.hypot` calcula o comprimento entre eles e `Math.atan2` calcula a inclinação. Para mexer na diagonal, mude esses dois pontos. O Z igual a `6.34` mantém as barras visíveis à frente da placa.

### Como as 28 caixas do zero são criadas?

Um `for` roda 28 vezes. A cada volta ele calcula um ângulo, cria um `Mesh` de `BoxGeometry` e o posiciona na borda da circunferência. Todas compartilham o mesmo material, por isso acendem juntas.

### Como Math.cos() e Math.sin() formam o zero?

Para cada ângulo, o cosseno calcula a coordenada X e o seno calcula Y. Multiplicar pelo raio coloca cada caixa na borda da circunferência.

### O que é elapsedTime?

É o tempo total, em segundos, desde o início do relógio. Como depende do tempo e não da quantidade de quadros, a animação mantém o ritmo em computadores diferentes.

### Qual é a diferença entre delta e elapsedTime?

`delta` é o tempo entre o quadro atual e o anterior, usado para calcular deslocamento. `elapsedTime` é o tempo acumulado, útil para movimentos periódicos como `Math.sin()`.

### Por que usar Math.sin()?

O seno varia suavemente entre -1 e 1. Isso produz um movimento de ida e volta sem criar várias condições.

## Perguntas do Herick — interações, loop e câmera (11)

### Por que setAnimationLoop em vez de renderizar uma vez?

Porque animações e movimento precisam atualizar posições e redesenhar a cena continuamente. Uma renderização única mostraria apenas uma imagem parada.

### O que é FPS?

É a quantidade de quadros desenhados por segundo. Quanto maior o FPS, mais contínuo parece o movimento.

### Como funciona o pulo?

Espaço inicia o pulo. No loop, `tempoDoPulo` cresce com `delta`; meio ciclo de `Math.sin()` eleva a pessoa e a traz de volta ao chão em 0,8 segundo.

### Como a pessoa vira para onde está andando?

As teclas viram duas direções, `direcaoX` e `direcaoZ`, que valem -1, 0 ou 1. O boneco foi montado com o rosto para +Z, e `Math.atan2(direcaoX, direcaoZ)` devolve o ângulo de `rotation.y` que aponta o rosto para essa direção: D dá 90°, W dá 180°, e W+D dá 135°, a diagonal. Parado, as duas direções são zero, então o ângulo não é recalculado e o boneco continua olhando para onde ia.

### O que acontece se a janela perder o foco com uma tecla apertada?

O `keyup` nunca chegaria e a pessoa andaria sozinha. O evento `blur` da janela solta todas as teclas. E o `delta` é limitado a 0,05 segundo com `Math.min`: ao voltar de outra aba, ele viria com vários segundos de uma vez e a pessoa daria um salto.

### Por que a câmera está nessa posição?

Dois ângulos e uma distância definem a posição da câmera. `lookAt(centroDaCamera)` a mantém apontada para o clube. O arrasto muda os ângulos; a roda muda a distância.

### O que o Raycaster faz?

Ele lança um raio imaginário da câmera na direção do mouse e informa quais objetos 3D foram atingidos.

### Por que converter o mouse para o intervalo de -1 a 1?

Esse é o sistema de coordenadas normalizadas que o Three.js espera em `setFromCamera()`, independentemente do tamanho do canvas.

### Por que arrastar não acende o 40?

O código mede quanto o ponteiro se moveu. Se passou de cinco pixels, foi um arrasto e o clique seguinte não usa o `Raycaster`.

### O que emissive e emissiveIntensity fazem?

`emissive` define a cor que parece sair do próprio material. `emissiveIntensity` controla a força desse brilho.

### Como esconder o painel aumenta a área da cena?

O botão acrescenta ou remove a classe CSS `painel-oculto` na aplicação. A classe esconde o painel e dá toda a largura ao canvas; `atualizarTamanho()` corrige o tamanho do renderer e a proporção da câmera.
