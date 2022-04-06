import { module, test } from 'qunit';
import { visit, currentURL, click, find, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | question', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /question hey', async function (assert) {
    await visit('/question');

    assert.equal(currentURL(), '/question');
  });

  test('visiting the first question', async function (assert) {
    await visit('/questionnaires');

    await click('.questionnaires-item__link');
    await click(find('button:nth-child(2)'));
    assert.equal(currentURL(), '/questionnaires/question/list_12110962');
  });

  test('visiting the first question and the first question was multiple-choice', async function (assert) {
    await visit('/questionnaires');

    await click('.questionnaires-item__link');
    await click(find('button:nth-child(2)'));

    assert.dom('section p').exists();
    assert.equal(
      findAll('button').length,
      1,
      'One button only exists since this is the first question'
    );
  });
});
