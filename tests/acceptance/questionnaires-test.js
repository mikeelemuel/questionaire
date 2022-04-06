import { module, test } from 'qunit';
import { visit, currentURL, findAll, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | questionnaires', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /questionnaires', async function (assert) {
    await visit('/questionnaires');

    assert.equal(currentURL(), '/questionnaires');
  });

  test('has questionnaires', async function (assert) {
    await visit('/questionnaires');

    assert.equal(findAll('.questionnaires-item').length, 1);
  });

  test('click the questionnaire item to redirect user to the questionnaire record', async function (assert) {
    await visit('/questionnaires');

    await click('.questionnaires-item__link');
    assert.equal(currentURL(), '/questionnaires/40');
  });
});
