<template>
  <div class="demo">
    <div class="head">
      <div class="title">{{ title }}</div>
      <div class="run-btn" @click="run">Run</div>
    </div>
    <div class="content">
      <div class="code">
        <slot />
      </div>
      <div class="result">
        <div v-if="html" v-html="html" />
        <pre v-for="(text, index) of result" :key="index">{{ text }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import * as producer from '@mokia/producer';
import runCode from '../libs/runCode';

export default {
  props: {
    title: { type: String, required: true },
  },
  data() {
    return {
      html: '',
      javascript: '',
      result: [],
    };
  },
  mounted() {
    this.$watch(
      '$slots.default',
      () => {
        this.html = this.filterNodes('language-html')
          .map(({ elm }) => elm?.outerText)
          .join('');

        this.javascript = this.filterNodes('language-javascript')
          .map(({ elm }) => elm?.outerText)
          .join('\n');

        this.$nextTick(() => this.run());
      },
      { immediate: true },
    );
  },
  methods: {
    filterNodes(className) {
      return this.$slots.default.filter(({ elm }) => elm?.classList.contains(className));
    },
    async run() {
      const $ = document.querySelector.bind(document);
      this.result = runCode(this.javascript, Object.assign({ $ }, producer));
    },
  },
};
</script>

<style lang="less" scoped>
.demo {
  position: relative;
  margin-top: 12px;
  border: 1px solid #e5e7ee;

  .head {
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 32px;
    border-bottom: 1px solid #e5e7ee;

    .title {
      padding: 0 8px;
      display: flex;
      align-items: center;
      background: #e8edf7;
      border-radius: 4px;
      color: #4171ff;
    }

    .run-btn {
      color: #4171ff;
      cursor: pointer;
      user-select: none;
    }
  }

  .content {
    display: flex;

    .code {
      padding: 12px;
      flex: 1;
      min-width: 0;
      border-right: 1px dashed #e5e7ee;
      overflow: auto;

      > div {
        background: transparent;

        & + div {
          margin-top: 12px;
        }
      }
    }

    .result {
      padding: 12px 12px 12px 22px;
      flex: 1;
      min-width: 0;
      overflow: auto;

      pre {
        position: relative;

        &:not(:empty)::before {
          position: absolute;
          top: 7px;
          left: -16px;
          display: block;
          width: 6px;
          height: 6px;
          content: '';
          border-top: 2px solid #dfdfdf;
          border-right: 2px solid #dfdfdf;
          transform: rotate(45deg);
        }
      }
    }
  }

  .original {
    display: none;
  }

  pre {
    margin: 0;
    padding: 0;
    background: transparent;
    overflow: visible;

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
