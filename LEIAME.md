# 💈 Barbearia Madick — Site

## Estrutura de arquivos

```
madick_site/
├── index.html       ← página principal
├── style.css        ← todo o visual/design
├── script.js        ← agendamento, WhatsApp, animações
├── manifest.json    ← configuração de app (PWA)
└── img/
    ├── foto1.jpg    ← foto do barbeiro (tesoura) ⚠️ adicionar
    ├── foto2.jpg    ← foto do barbeiro (máquina) ⚠️ adicionar
    └── icon.png     ← ícone do app 192x192px     ⚠️ adicionar
```

---

## ⚠️ O que você precisa configurar

### 1. Fotos
Crie a pasta `img/` e coloque as fotos com esses nomes:
- `foto1.jpg` → foto do barbeiro com tesoura
- `foto2.jpg` → foto do barbeiro com máquina
- `icon.png`  → ícone do app (192×192 pixels)

### 2. Número do WhatsApp
Abra o `script.js` e troque na linha:
```js
var NUMERO = '5511999999999';
```
Pelo número real com DDI+DDD, sem espaços ou traços.
Exemplo: `5511987654321`

### 3. Endereço
No `index.html`, procure por:
```
⚠️ Troque pelo endereço real
```
E substitua pelo endereço real da barbearia.

### 4. Ano de fundação
No `index.html`, procure por `Est. desde 2010` e troque pelo ano correto.

---

## 🚀 Como publicar (grátis)

### Opção 1 — Netlify (recomendado)
1. Acesse https://netlify.com e crie uma conta grátis
2. Arraste a pasta `madick_site/` inteira para o site
3. Pronto! Você recebe um link tipo `madick.netlify.app`

### Opção 2 — GitHub Pages
1. Crie conta em https://github.com
2. Crie um repositório público
3. Faça upload dos arquivos
4. Vá em Settings → Pages → selecione a branch main

---

## 📱 Como virar app no celular (sem loja)

Depois de publicar o site:
1. Abra o site no celular (Chrome ou Safari)
2. Clique nos 3 pontos (Android) ou no botão compartilhar (iPhone)
3. Selecione **"Adicionar à tela inicial"**
4. O site aparece como ícone igual a um app!

---

## 🔧 Como editar os preços

Abra o `index.html` e procure por cada serviço.
Cada card tem este formato:

```html
<div class="service-card">
  <div class="service-icon">✂️</div>
  <div class="service-name">Corte Simples</div>
  <div class="service-desc">Descrição do serviço aqui.</div>
  <div class="service-price">R$40 <span>/ sessão</span></div>
</div>
```

Basta trocar o nome, descrição e preço!
