/**
 * Breakpoint helper made from Bootstrap's breakpoint utility
 *
 * @author Marvin Heilemann <marvin.heilemann@googlemail.com>
 * @version 3.0.0
 * @todo VSC scss highlighting below
 * @required '~bootstrap/scss/bootstrap';
 *
 * Add this snippet to your .scss file:
 *```scss
body {
  &::before {
    content: 'xs';
    display: none;
  }

  @each $breakpoint, $breakpoint-width in $grid-breakpoints {
    @include media-breakpoint-up($breakpoint) {
      &::before {
        content: '#{$breakpoint}';
      }
    }
  }
}
```*/

const Breakpoint = {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  widths: [null, 576, 768, 992, 1200],

  /**
   * Returns current breakpoint alias
   */
  current() {
    return (
      window
        .getComputedStyle(document.querySelector('body'), ':before')
        .getPropertyValue('content')
        .replace(/"/g, '') || 'unrecognized'
    );
  },

  /**
   * Returns current breakpoint size
   */
  width() {
    return this.widths[this.breakpoints.indexOf(this.current().toLowerCase())];
  },

  /**
   * Returns true if current breakpoint matches passed alias
   */
  is(str) {
    if (this._isAnExpression(str)) {
      return this._isMatchingExpression(str);
    }

    return this.current() === str;
  },

  /**
   * Determines whether passed string is a parsable expression
   */
  _isAnExpression(str) {
    return str.charAt(0) === '<' || str.charAt(0) === '>';
  },

  /**
   * Splits the expression in into <|> [=] alias
   */
  _splitExpression(str) {
    // Used operator
    const operator = str.charAt(0);
    // Include breakpoint equal to alias?
    const orEqual = str.charAt(1) === '=';

    /**
     * Index at which breakpoint name starts.
     *
     * For:  >sm, index = 1
     * For: >=sm, index = 2
     */
    const index = 1 + (orEqual ? 1 : 0);

    /**
     * The remaining part of the expression, after the operator, will be treated as the
     * breakpoint name to compare with
     */
    const breakpointName = str.slice(index);

    return {
      operator,
      orEqual,
      breakpointName
    };
  },

  /**
   * Returns true if currently active breakpoint matches the expression
   */
  _isAnyActive(breakpoints) {
    let found = false;

    breakpoints.forEach(alias => {
      // Once first breakpoint matches, return true and break out of the loop
      if (this.current() === alias) {
        found = true;

        return false;
      }
    });

    return found;
  },

  /**
   * Determines whether current breakpoint matches the expression given
   */
  _isMatchingExpression(str) {
    const expression = this._splitExpression(str);

    // Get names of all breakpoints
    const breakpointList = this.breakpoints;

    // Get index of sought breakpoint in the list
    let pos = breakpointList.indexOf(expression.breakpointName);

    // Breakpoint found
    if (pos !== -1) {
      let start = 0;
      let end = 0;

      /**
       * Parsing viewport.is('<=md') we interate from smallest breakpoint ('xs') and end
       * at 'md' breakpoint, indicated in the expression,
       * That makes: start = 0, end = 2 (index of 'md' breakpoint)
       *
       * Parsing viewport.is('<md') we start at index 'xs' breakpoint, and end at
       * 'sm' breakpoint, one before 'md'.
       * Which makes: start = 0, end = 1
       */
      if (expression.operator === '<') {
        start = 0;
        end = expression.orEqual ? ++pos : pos;
      }
      /**
       * Parsing viewport.is('>=sm') we interate from breakpoint 'sm' and end at the end
       * of breakpoint list.
       * That makes: start = 1, end = undefined
       *
       * Parsing viewport.is('>sm') we start at breakpoint 'md' and end at the end of
       * breakpoint list.
       * Which makes: start = 2, end = undefined
       */
      if (expression.operator === '>') {
        start = expression.orEqual ? pos : ++pos;
        end = undefined;
      }

      const acceptedBreakpoints = breakpointList.slice(start, end);

      return this._isAnyActive(acceptedBreakpoints);
    }
  }
};

export default Breakpoint;
