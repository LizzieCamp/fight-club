import { capitalise } from './capitalise';

test('capitalises the first letter of one word', () => {
    expect(capitalise('jeff')).toEqual('Jeff');
});
test('capitalises the first letter of  multiple words', () => {
    expect(capitalise('jeff jeff')).toEqual('Jeff Jeff');
});

test('lowercases the rest of each word', () => {
    expect(capitalise('jeFF')).toEqual('Jeff');
});
