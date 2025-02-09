import { produce } from 'immer';
import { LitElement, html, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';

const logo = new URL('../../assets/open-wc-logo.svg', import.meta.url).href;

@customElement('main-page')
export class MainPage extends LitElement {
  @property({ type: String }) header = 'My app';

  @property({ type: Number }) counter = 0;

  @state() private _inputfieldValue = {
    type: '',
    reflect: true,
  };

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--main-page-background-color);
    }

    main {
      flex-grow: 1;
    }

    .logo {
      margin-top: 36px;
      animation: app-logo-spin infinite 20s linear;
    }

    @keyframes app-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  render() {
    return html`
      <main>
        <div class="logo"><img alt="open-wc logo" src=${logo} /></div>
        <h1>${this.header}</h1>

        <p>Edit <code>src/MainPage.ts</code> and save to reload.</p>
        <a
          class="app-link"
          href="https://open-wc.org/guides/developing-components/code-examples"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code examples
        </a>
        <p>
          ${this.counter}
          <button
            @click=${() => {
              this.counter += 1;
            }}
          >
            increment
          </button>
        </p>
        <input
          type="text"
          .value=${this._inputfieldValue.type}
          @input=${(e: Event) => {
            this._inputfieldValue = produce(this._inputfieldValue, draft => {
              draft.type = (e.target as HTMLInputElement).value;
            });
          }}
        />
        ${this._inputfieldValue.type}
      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >.
      </p>
    `;
  }
}
