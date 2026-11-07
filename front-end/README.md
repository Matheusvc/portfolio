# Matheus Lira — Portfólio (front-end)

## Stack

- **React 18** + **TypeScript** (modo estrito)
- **Vite**: dev server e build
- **Tailwind CSS**: tokens de design em `tailwind.config.ts`
- **Matter.js**: física das etiquetas da seção "Tudo que seu projeto precisa" (carregado sob demanda)
- **Vitest** + **Testing Library**: testes
- **ESLint** (TypeScript, React Hooks, acessibilidade) + **Prettier**

Requer Node 20+ (versão de referência em `.nvmrc`).

## Comandos

```bash
npm install
npm run dev          # http://localhost:4567
npm run test         # testes (npm run test:watch para modo contínuo)
npm run check        # tipos + lint + formatação + testes — o mesmo que a CI roda
npm run format       # formata o código
npm run build        # gera dist/ para publicar
npm run preview      # serve o build localmente
```

## Estrutura

```
src/
├── main.tsx                # entrada
├── app/App.tsx             # ordem das seções da página
├── config/site.ts          # nome, contatos (WhatsApp, LinkedIn…), âncoras e menu
├── content/index.ts        # textos, listas e imagens de cada seção
├── types/content.ts        # tipos do conteúdo
├── hooks/                  # lógica de UI reutilizável (scroll spy, rotação de telas, hover…)
├── lib/                    # código sem React (motor de física, importado sob demanda)
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # uma seção da página por componente
│   └── ui/                 # Section, Button, ArrowButton, TagHand
├── styles/index.css        # Tailwind + estilos que exigem CSS puro (pseudo-elementos, keyframes)
├── assets/images/          # imagens em WebP, no dobro do tamanho em que aparecem
└── test/setup.ts           # configuração dos testes (jsdom)
```

## Decisões

- **Conteúdo separado da apresentação.** Textos, links e listas ficam em `content/` e `config/`;
  os componentes só recebem dados. Para trocar um texto, não é preciso mexer em componente.
- **Cores das seções.** Cada seção usa `<Section tone="white | navy | blue">` e segue a sequência
  azul → branco → azul-marinho → branco. Mantenha essa ordem ao adicionar seções.
- **Desempenho.** Imagens em WebP no tamanho de exibição; o Matter.js fica num chunk separado,
  baixado só quando a seção das etiquetas se aproxima da tela. Animações pausam fora da tela,
  com a aba oculta e com `prefers-reduced-motion`.
- **Acessibilidade.** Link para pular ao conteúdo, menu com `aria-expanded` e Esc, FAQ com
  `aria-controls`, alvos de toque de 44px, foco visível e lint de `jsx-a11y`.
- **Testes.** Os testes ficam ao lado do código (`*.test.tsx`) e cobrem o comportamento que o
  visitante usa: menu, FAQ, troca de projeto no carrossel, links internos e externos e o link do WhatsApp.
