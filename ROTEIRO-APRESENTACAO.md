# Roteiro de apresentação — Clube dos 40

Tempo previsto: aproximadamente 4 minutos.

## 1. Tiago — visão geral e base do Three.js (0:00 a 1:20)

1. Apresente o tema: “Evoluímos a Mini Aperibé para uma representação interativa do Clube dos 40.”
2. Mostre na tela o portal, a sede, a piscina com deck, a quadra e o campo ao fundo.
3. Abra a seção 1 do código e explique:
   - `Scene` guarda todos os elementos 3D;
   - `PerspectiveCamera` define o ponto de vista com profundidade;
   - `WebGLRenderer` desenha a cena no `canvas`.
4. Abra a seção 2 e mostre o `TextureLoader`.
5. Destaque `wrapS`, `wrapT` e `repeat.set(9, 7)` na textura de grama.

Frase de passagem: “Depois de preparar a cena e os materiais, construímos o clube só com geometrias simples.”

## 2. Raphael — objetos, logo e animações (1:20 a 2:40)

1. Mostre sede, deck da piscina, quadra, campo, gols e árvores.
2. Explique que todo `Mesh` combina uma geometria e um material.
3. Mostre o logo 40:
   - o 4 tem três `BoxGeometry`;
   - o 0 repete uma caixa 14 vezes;
   - o ângulo muda a cada volta do `for`;
   - `Math.cos()` calcula X e `Math.sin()` calcula Y.
4. Mostre o final do loop de animação:
   - nuvens somam uma distância em X e voltam ao início;
   - bandeira oscila com `Math.sin()`;
   - água varia levemente de altura.

Frase de passagem: “Além de animar a cena, usamos teclado e mouse para o usuário participar.”

## 3. Herick — interações e fechamento (2:40 a 4:00)

1. Demonstre W, A, S e D movendo a pessoa.
2. Explique que `keydown` marca uma tecla como verdadeira e `keyup` volta para falsa.
3. Mostre `THREE.MathUtils.clamp`, que impede a pessoa de sair do terreno.
4. Clique no logo 40 da placa de entrada para acender e apagar.
5. Explique o caminho do clique:
   - coordenada do mouse vira um valor entre -1 e 1;
   - `setFromCamera()` cria o raio a partir da câmera;
   - `intersectObjects()` verifica se uma peça do logo foi atingida;
   - `emissive` faz o material parecer aceso.
6. Feche citando os números: 35 meshes, 5 geometrias, 3 texturas e 3 animações.

## Perguntas prováveis do professor

### O que são Scene, Camera e Renderer?

`Scene` é o contêiner dos objetos, luzes e grupos. `Camera` define de onde a cena é observada. `Renderer` transforma essas informações em pixels no canvas.

### O que é Geometry, Material e Mesh?

`Geometry` define a forma e os vértices. `Material` define a aparência. `Mesh` junta os dois para formar um objeto visível.

### Por que MeshStandardMaterial precisa de luz?

Porque ele calcula como a luz bate na superfície. Sem uma luz na cena, esse material fica escuro.

### Para que servem AmbientLight e DirectionalLight?

`AmbientLight` clareia todos os objetos de maneira geral. `DirectionalLight` simula uma luz vinda de uma direção, como o sol.

### O que o repeat faz na textura?

Ele repete a imagem em vez de esticá-la uma única vez. `repeat.set(9, 7)` desenha nove repetições no eixo horizontal e sete no vertical.

### Por que configurar wrapS e wrapT?

Essas propriedades autorizam a repetição da textura nos dois eixos. `S` corresponde ao horizontal e `T` ao vertical.

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

Porque corpo e cabeça são meshes separados. Ao mover o grupo, as duas partes se movem juntas.

### O que é InstancedMesh no número zero?

É uma forma de desenhar várias cópias da mesma geometria e do mesmo material como um único Mesh. O `for` cria uma matriz de posição e rotação para cada uma das 14 caixas.

### Como Math.cos() e Math.sin() formam o zero?

Para cada ângulo, o cosseno calcula a coordenada X e o seno calcula Y. Multiplicar pelo raio coloca cada caixa na borda da circunferência.

### O que position, rotation e scale fazem?

`position` move o objeto nos eixos X, Y e Z. `rotation` gira o objeto em radianos. `scale` altera suas proporções.

### Por que abrir com servidor local?

O navegador aplica regras de segurança a módulos e arquivos carregados. O servidor entrega o HTML, o módulo e as texturas por HTTP, evitando bloqueios de arquivos locais.
