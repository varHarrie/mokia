<template>
  <div class="demo">
    <div class="title">{{ title }}</div>
    <div class="run-btn" @click="exec">run</div>
    <div class="code">
      <pre v-html="codeHighlighted" />
    </div>
    <div class="result">
      <pre v-for="(text, index) of result" :key="index">{{ text }}</pre>
    </div>
  </div>
</template>

<script>
import * as producer from '@mokia/producer';
import prism from 'prismjs';

export default {
  props: {
    title: { type: String, required: true },
  },
  data() {
    return {
      result: [],
    };
  },
  computed: {
    code() {
      return (this.$slots.default?.[0].children?.[0].text || '').trim();
    },
    codeHighlighted() {
      const html = prism.highlight(this.code, prism.languages.javascript, 'javascript');
      return `<code>${html}</code>`;
    },
  },
  mounted() {
    this.exec();
  },
  methods: {
    async exec() {
      const output = [];

      this.code.split(/;\n?/g).forEach((line) => {
        try {
          const f = new Function('producer', `return ${line}`);
          output.push(JSON.stringify(f(producer), null, 2));
        } catch (error) {
          console.log(error);
          output.push('ERROR');
        }
      });

      this.result = output;
    },
  },
};
</script>

<style lang="less" scoped>
.demo {
  position: relative;
  margin-top: 12px;
  padding: 48px 12px 12px;
  display: flex;
  border: 1px solid #e5e7ee;

  .title {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    line-height: 32px;
    background: #e8edf7;
    border-radius: 4px;
    color: #4171ff;

    &::before {
      margin-right: 8px;
      display: block;
      content: '';
      width: 8px;
      height: 8px;
      line-height: 8px;
      border-radius: 50%;
      background: #73abfe;
      color: #fff;
      text-align: center;
      font-size: 12px;
    }
  }

  .run-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    line-height: 32px;
    color: #4171ff;
    cursor: pointer;
    user-select: none;
  }

  .code {
    margin-right: 12px;
    padding: 8px 12px 8px 0;
    flex: 1;
    min-width: 0;
    border-right: 1px dashed #e5e7ee;
  }

  .result {
    padding: 8px 0;
    flex: 1;
    min-width: 0;
  }

  pre {
    margin: 0;
    padding: 0;
    background: transparent;

    /deep/ code {
      /** Based on https://github.com/chriskempson/tomorrow-theme#tomorrow */
      color: #525252;

      .token.comment,
      .token.block-comment,
      .token.prolog,
      .token.doctype,
      .token.cdata {
        color: #8e908c;
      }

      .token.punctuation {
        color: #8e908c;
      }

      .token.tag,
      .token.attr-name,
      .token.namespace,
      .token.deleted {
        color: #c82829;
      }

      .token.function-name {
        color: #6196cc;
      }

      .token.boolean,
      .token.number,
      .token.function {
        color: #f5871f;
      }

      .token.property,
      .token.class-name,
      .token.constant,
      .token.symbol {
        color: #eab700;
      }

      .token.selector,
      .token.important,
      .token.atrule,
      .token.keyword,
      .token.builtin {
        color: #8959a8;
      }

      .token.string,
      .token.char,
      .token.attr-value,
      .token.regex,
      .token.variable {
        color: #718c00;
      }

      .token.operator,
      .token.entity,
      .token.url {
        color: #4271ae;
      }

      .token.important,
      .token.bold {
        font-weight: bold;
      }
      .token.italic {
        font-style: italic;
      }

      .token.entity {
        cursor: help;
      }

      .token.inserted {
        color: green;
      }
    }
  }

  & + & {
    margin-top: -1px;
  }
}
</style>
