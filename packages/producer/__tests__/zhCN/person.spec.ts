import * as producer from '../../src';

describe('firstName', () => {
  it('firstName()', () => {
    expect(producer.zhCN.firstName()).toMatch(/^[\u4e00-\u9fa5]{1,2}$/);
  });
});

describe('lastName', () => {
  it('lastName()', () => {
    expect(producer.zhCN.lastName()).toMatch(/^[\u4e00-\u9fa5]{1,2}$/);
  });
});

describe('fullName', () => {
  it('fullName()', () => {
    expect(producer.zhCN.fullName()).toMatch(/^[\u4e00-\u9fa5]{2,4}$/);
  });
});

describe('phoneNumber', () => {
  it('phoneNumber()', () => {
    expect(producer.zhCN.phoneNumber()).toMatch(/^1\d{10}$/);
  });
});

describe('idNumber', () => {
  it('idNumber()', () => {
    expect(producer.zhCN.idNumber()).toMatch(/^[1-9]\d{5}(19|20)\d{2}(0\d|10|11|12)(0\d|1\d|2\d|30|31)\d{3}[0-9x]$/);
  });
});
