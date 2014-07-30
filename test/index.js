var expect = require('chai').expect;
var compile = require('..').compile;

describe('ES6ObjectShort', function() {
  function transform(code) {
    return compile(code).code;
  }

  function expectTransform(code, result) {
    expect(transform(code)).to.eql(result);
  }

  it('should fix short object notation', function() {
    var code = [
      'var a = {',
      '  b,',
      '  c',
      '};'
    ].join('\n');

    var result = [
      'var a = {',
      '  b: b,',
      '  c: c',
      '};'
    ].join('\n');

    expectTransform(code, result);
  });

  it('works with shorthand methods', function() {
    var code = [
      'var a = {',
      '  test() {',
      '    return 1;',
      '  }',
      '};'
    ].join('\n');

    var result = [
      'var a = {',
      '  test: function() {',
      '    return 1;',
      '  }',
      '};'
    ].join('\n');

    expectTransform(code, result);
  });

  it('does not change get and set shorthand methods', function() {
    var code = [
      'var a = {',
      '  get name() {',
      '    return getName();',
      '  },',
      '',
      '  set name(name) {',
      '    setName(name);',
      '  }',
      '};'
    ].join('\n');

    var result = [
      'var a = {',
      '  get name() {',
      '    return getName();',
      '  },',
      '',
      '  set name(name) {',
      '    setName(name);',
      '  }',
      '};'
    ].join('\n');

    expectTransform(code, result);
  });
});
