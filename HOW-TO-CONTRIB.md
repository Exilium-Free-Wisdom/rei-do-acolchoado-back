## Conteúdo

- [Introdução](#introdução)
- [Regras para criação de *branches*](#regras-para-criação-da-branch)
- [Regras para criação de *commits*](#regras-para-criação-de-commits)
    - [Tipo](#tipo)
    - [Descrição curta](#descrição-curta)
- [Regras para criação de *Pull Requests*](#regras-para-criação-de-pull-requests)
    - [Componente](#componente)
    - [Número da ISSUE](#número-da-issue)
    - [*PR Checklist*](#pr-checklist)
    - [Qual o comportamento atual?](#qual-o-comportamento-atual)
    - [Qual o novo comportamento?](#qual-o-novo-comportamento)
    - [Simulação](#simulação)


## Introdução

Este guia tem por objetivo definir as regras para criação de *Branches*, *Pull Requests* e *Commits* no projeto.
Para seguir o guia é fundamental o conhecimento da [ferramenta Git](https://git-scm.com/book/en/v2).


## Regras para criação da *Branch*

Antes de criar uma nova *branch* deve-se assegurar de estar na *branch main* do projeto.
Caso já esteja na *main* rode o comando:

```
git pull
```

Se não retornar nenhum erro ela estará atualizada e é hora de criar a *branch* no projeto. Para isso rode o comando:

```
git checkout -b <COMPONENTE>/<ISSUE>
```

Onde o `<COMPONENTE>` deve conter o nome do componente e não o projeto onde ele se encontra. E a `<ISSUE>` se refere a modificação no código.
Exemplos:
```
git checkout -b ddtos/vendas
```

## Regras para criação de *Commits*

A descrição dos *commits* podem ser feitos em português ou inglês.

Deve-se seguir um padrão para criação dos *commits*:

```
<TIPO>: <DESCRIÇÃO CURTA>
```
Agora vamos detalhar melhor o que deve ser descrito em cada parte:

### Tipo

Deve ser utilizado um dos tipos descritos abaixo conforme o objetivo da alteração:

- build (quando a alteração está relacionada ao *build*);
- docs (quando a alteração for na documentação);
- feat (quando for uma melhoria, for criada uma nova funcionalidade ou um novo componente);
- fix (para correção de *bugs*);
- perf (quando o item é gerado para melhoria de performance);
- refactor (quando for feito uma refatoração ou aplicação de boas práticas);
- test (quando forem adicionados ou refatorados os testes);

> Nunca colocar espaço entre a descrição do tipo e a abertura de parênteses do escopo.

### Descrição curta

- Deve-se colocar uma breve descrição do que foi feito no *commit*.
- Nunca iniciar a descrição com letra maiúscula.
- Nunca deve utilizar ponto final na descrição.
- Deve-se utilizar o modo imperativo na descrição.
- Não deve-se ultrapassar 72 caracteres na soma dos caracteres do tipo, escopo e descrição curta.

por exemplo:

Corretas:

```
adiciona nova funcionalidade
```
```
remove variável não mais utilizada
```

Erradas:

```
Adicionada nova funcionalidade.
```
```
Removida variável não mais utilizada no componente po-button devido a quebra no uso do mesmo.
```

### Corpo

- Deve-se utilizar o modo imperativo na descrição.
- Deve-se quebrar linha a cada 72 caracteres para que a mesma não seja cortada no GitHub.
- Deve descrever a motivação que levou a mudança e também o que foi alterado em relação ao comportamento anterior.

> Antes da declaração do corpo deve-se deixar uma linha em branco.

## Regras para criação de *Pull Requests*

Antes de criar a *Pull Request* é importante verificar se algumas coisas:

- Verifique nas [*Pull Requests*](https://github.com/Exilium-Free-Wisdom/candy_salt/pulls) se nenhuma submissão anterior já resolveu o problema.
- A *Pull Request* resolveu o problema solicitado na ISSUE?
- Foi gerado apenas um *commit* para solução do problema? Caso tenha mais de um *commit* ou o padrão não esteja de acordo deve seguir este [Guia de *commits*](#commits).
- Foram rodados todos os testes unitários da aplicação?

Após essas verificações e tudo estando correto basta gerar a *Pull Request*. Por padrão virá um template onde deverão ser preenchidos alguns requisitos citados abaixo:

### PR Checklist

Deve-se adicionar um `x` dentro dos colchetes sem deixar espaço em cada um dos itens que forem alterados na *Pull Request*.
Exemplo:

```
- [x] Código
- [x] Testes unitários
- [ ] Documentação
- [x] Samples
```

### Qual o comportamento atual?

Deve-se descrever o atual comportamento e o motivo que levou a gerar a alteração.

Exemplo:

```
O po-modal não está permitindo definir uma largura maior que 768px. Está gerando problema pois ao criar um formulário maior gera-se um scroll dificultando a visualização do cliente.
```

### Qual o novo comportamento?

Deve-se descrever o novo comportamento gerado, bem como o que e como foi alterado para solucionar o motivo que foi descrito no comportamento atual.

Exemplo:

```
Criação do novo valor "full" na propriedade p-size.
Este valor serve para poder deixar o po-modal ter o tamanho conforme o conteúdo sem a limitação de tamanho.
```

### Simulação

Aqui deve-se descrever sugestões de formas de validar a alteração gerada.

Exemplo:

```
Esta correção pode ser validada utilizando o sample labs no portal
```

> Além desses requisitos podem ser adicionados tópicos para facilitar o entendimento da *Pull Request*. Exemplo: Observações, definições, links...


Após gerar a *Pull Request* é só aguardar aprovação. Caso tiver alguma sugestão deve-se fazer as atualizações necessárias e rodar os testes novamente.
Faça um *rebase* e em seguida faça um *push* com as alterações e aguarde a aprovação.
Caso seja aprovado, parabéns, sua alteração já estará na *branch main*.
