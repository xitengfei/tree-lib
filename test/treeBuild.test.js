const city = require('./json/city.json');
const cityTree = require('./json/cityTreeData.json');
import {treeBuild} from '../src';

const formatCity = function(){
  const list = Object.keys(city).map(code => ({code, childs: city[code]}));
  const tree = treeBuild(list, {
    idKey: 'code',
    rootPid: '0',
    getChilds: (pid, level, path) => {
      const childs = city[path];
      if(childs) return Object.keys(childs).map(code => ({ code, name: childs[code]}));
      return [];
    }
  });
  return tree;
}

describe('treeBuild Test: ', () => {
  test('converrt city list to city tree data', () => {
    expect(formatCity()).toEqual(cityTree);
  });
});