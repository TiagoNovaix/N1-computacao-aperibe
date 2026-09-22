# Roteiro de apresentação — Clube dos 40

Tempo previsto: aproximadamente 4 minutos.

## 1. Tiago — visão geral e base do Three.js (0:00 a 1:20)

1. Apresente o tema: “Evoluímos a Mini Aperibé para uma representação interativa do Clube dos 40.”
2. Mostre a vista de chegada: portal na frente, duas piscinas, quadra, campo, banheiro e bancos. O terreno passou a medir 30 × 24 unidades.
3. Abra a seção 1 do código e explique:
   - `Scene` guarda todos os elementos 3D;
   - `PerspectiveCamera` define o ponto de vista com profundidade;
   - `WebGLRenderer` desenha a cena no `canvas`.
4. Abra a seção 2 e mostre o `TextureLoader`.
5. Destaque `wrapS`, `wrapT` e `repeat.set(12, 10)` na textura de grama.

Frase de passagem: “Depois de preparar a cena e os materiais, construímos o clube só com geometrias simples.”

## 2. Raphael — objetos, logo e animações (1:20 a 2:40)

1. Mostre sede, deck, piscina redonda, banheiro, bancos, quadra, campo, gols e árvores. As linhas brancas são caixas bem finas.
2. Explique que todo `Mesh` combina uma geometria e um material.
3. Mostre o logo 40:
   - o 4 tem três `BoxGeometry`: diagonal, barra horizontal e haste vertical;
   - o 0 repete uma caixa 14 vezes dentro de um `for`;
   - o comentário `AJUSTE MANUAL DO NÚMERO 4` indica onde mudar tamanho, posição e rotação de cada barra;
   - o ângulo muda a cada volta do `for`;
   - `Math.cos()` calcula X e `Math.sin()` calcula Y.
4. Mostre o final do loop de animação:
   - cada uma das seis nuvens é um `Group` de três esferas e se move em X;
   - bandeira usa uma textura do Brasil e oscila com `Math.sin()`;
   - água varia levemente de altura.

Frase de passagem: “Além de animar a cena, usamos teclado e mouse para o usuário participar.”

## 3. Herick — interações e fechamento (2:40 a 4:00)

1. Demonstre W, A, S e D movendo a pessoa, Espaço fazendo-a pular, o arrasto girando a câmera e o botão que oculta ou mostra o painel.
2. Explique que `keydown` marca uma tecla como verdadeira e `keyup` volta para falsa.
3. Mostre `THREE.MathUtils.clamp`, que impede a pessoa de sair do terreno.
4. Clique no logo 40 da placa de entrada para acender e apagar.
5. Explique o caminho do clique:
   - coordenada do mouse vira um valor entre -1 e 1;
   - `setFromCamera()` cria o raio a partir da câmera;
   - `intersectObjects()` verifica se uma peça do logo foi atingida;
   - `emissive` faz o material parecer aceso.
6. Feche citando os números: 104 meshes, 5 geometrias, 4 texturas e 4 animações.

## Perguntas prováveis do professor

### O que são Scene, Camera e Renderer?

`Scene` é o contêiner dos objetos, luzes e grupos. `Camera` define de onde a cena é observada. `Renderer` transforma essas informações em pixels no canvas.

### Por que a câmera está nessa posição?

Dois ângulos e uma distância definem a posição da câmera. `lookAt(centroDaCamera)` a mantém apontada para o clube. O arrasto muda os ângulos; a roda muda a distância.

### Como funciona o pulo?

Espaço inicia o pulo. No loop, `tempoDoPulo` cresce com `delta`; meio ciclo de `Math.sin()` eleva a pessoa e a traz de volta ao chão em 0,8 segundo.

### Por que arrastar não acende o 40?

O código mede quanto o ponteiro se moveu. Se passou de cinco pixels, foi um arrasto e o clique seguinte não usa o `Raycaster`.

### Como foram feitas as linhas da quadra e do campo?

Cada linha é uma `BoxGeometry` bem fina e branca. Os dois `for` percorrem as listas de posições e tamanhos: cinco caixas marcam a quadra (quatro bordas e a linha central) e cinco marcam o campo.

### O que é Geometry, Material e Mesh?

`Geometry` define a forma e os vértices. `Material` define a aparência. `Mesh` junta os dois para formar um objeto visível.

### O que a função adicionar faz?

Todo objeto passa pelos mesmos três passos: `new THREE.Mesh(geometria, material)`, `position.set(x, y, z)` e `scene.add(...)`. A função `adicionar` faz os três e devolve o Mesh, para que ainda dê para mudar `rotation` ou `scale` depois. O último parâmetro, `pai`, vale `scene` por padrão; nas partes da pessoa e das nuvens ele recebe o `Group`, então a peça entra no grupo em vez da cena.

### Por que várias peças usam a mesma geometria?

As 14 peças do zero, as 8 árvores e os postes têm formas idênticas. Criar uma geometria só e passar para vários Meshes economiza memória: a forma fica guardada uma vez, e cada Mesh tem só a própria posição, rotação e escala.

### O que acontece se a janela perder o foco com uma tecla apertada?

O `keyup` nunca chegaria e a pessoa andaria sozinha. O evento `blur` da janela solta todas as teclas. E o `delta` é limitado a 0,05 segundo com `Math.min`: ao voltar de outra aba, ele viria com vários segundos de uma vez e a pessoa daria um salto.

### Por que MeshStandardMaterial precisa de luz?

Porque ele calcula como a luz bate na superfície. Sem uma luz na cena, esse material fica escuro.

### Para que servem AmbientLight e DirectionalLight?

`AmbientLight` clareia todos os objetos de maneira geral. `DirectionalLight` simula uma luz vinda de uma direção, como o sol.

### O que o repeat faz na textura?

Ele repete a imagem em vez de esticá-la uma única vez. `repeat.set(12, 10)` desenha doze repetições no eixo horizontal e dez no vertical, cobrindo o terreno maior.

### Por que configurar wrapS e wrapT?

Essas propriedades autorizam a repetição da textura nos dois eixos. `S` corresponde ao horizontal e `T` ao vertical.

### Como a bandeira do Brasil foi feita?

O script gera um PNG com fundo verde, losango amarelo e círculo azul. O `TextureLoader` carrega esse arquivo e o `map` aplica a imagem ao plano da bandeira.

### Por que a bandeira usa DoubleSide?

Um plano normalmente aparece apenas pelo lado da frente. `THREE.DoubleSide` permite enxergar a textura também quando a câmera olha o verso da bandeira.

### O que é elapsedTime?

É o tempo total, em segundos, desde o início do relógio. Como depende do tempo e não da quantidade de quadros, a animação mantém o ritmo em computadores diferentes.

### Qual é a diferença entre delta e elapsedTime?

`delta` é o tempo entre o quadro atual e o anterior, usado para calcular deslocamento. `elapsedTime` é o tempo acumulado, útil para movimentos periódicos como `Math.sin()`.

### Por que usar Math.sin()?

O seno varia suavemente entre -1 e 1. Isso produz um movimento de ida e volta sem criar várias condições.

### O que o Raycaster faz?

Ele lança um raio imaginário da câmera na direção do mouse e informa quais objetos 3D foram atingidos.

### Por que converter o mouse para o intervalo de -1 a 1?

Esse é o sistema de coordenadas normalizadas que o Three.js espera em `setFromCamera()`, independentemente do tamanho do canvas.

### O que emissive e emissiveIntensity fazem?

`emissive` define a cor que parece sair do próprio material. `emissiveIntensity` controla a força desse brilho.

### Por que setAnimationLoop em vez de renderizar uma vez?

Porque animações e movimento precisam atualizar posições e redesenhar a cena continuamente. Uma renderização única mostraria apenas uma imagem parada.

### O que é FPS?

É a quantidade de quadros desenhados por segundo. Quanto maior o FPS, mais contínuo parece o movimento.

### Qual é a diferença entre raster e vetor?

Raster é uma imagem formada por uma grade de pixels, como os PNGs das texturas. Vetor descreve formas matematicamente e pode aumentar de tamanho sem perder nitidez.

### Por que a pessoa é um Group?

Porque camiseta, bermuda, cabeça, cabelo, olhos, braços, mãos, pernas e tênis são meshes separados. Ao mover o grupo, todas as 15 partes se movem juntas.

### Como as nuvens deixaram de ser ovais?

Cada nuvem é um `Group` com três esferas de tamanhos e alturas diferentes. Mover o grupo faz os três volumes viajarem juntos. Há seis grupos espalhados sobre o terreno.

### Como esconder o painel aumenta a área da cena?

O botão acrescenta ou remove a classe CSS `painel-oculto` na aplicação. A classe esconde o painel e dá toda a largura ao canvas; `atualizarTamanho()` corrige o tamanho do renderer e a proporção da câmera.

### Como é feita a piscina redonda?

Dois cilindros bem baixos, um branco e outro com a textura da água, formam borda e superfície. A superfície varia um pouco de altura no loop de animação.

### Onde alterar manualmente o 4?

Procure `AJUSTE MANUAL DO NÚMERO 4` em `index.html`. A primeira chamada é a diagonal, a segunda é a haste vertical e a terceira é a barra horizontal. `Vector2` controla largura e altura; `Vector3` controla X, Y e Z; o último valor controla a rotação. O Z igual a `6.34` mantém as barras visíveis à frente da placa.

### Como as 14 caixas do zero são criadas?

Um `for` roda 14 vezes. A cada volta ele calcula um ângulo, cria um `Mesh` de `BoxGeometry` e o posiciona na borda da circunferência. Todas compartilham o mesmo material, por isso acendem juntas.

### Como Math.cos() e Math.sin() formam o zero?

Para cada ângulo, o cosseno calcula a coordenada X e o seno calcula Y. Multiplicar pelo raio coloca cada caixa na borda da circunferência.

### O que position, rotation e scale fazem?

`position` move o objeto nos eixos X, Y e Z. `rotation` gira o objeto em radianos. `scale` altera suas proporções.

### Por que abrir com servidor local?

O navegador aplica regras de segurança a módulos e arquivos carregados. O servidor entrega o HTML, o módulo e as texturas por HTTP, evitando bloqueios de arquivos locais.
