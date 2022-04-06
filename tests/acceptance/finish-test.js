import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | finish', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /finish but it will redirect to the quesetionnaires since all questions are not yet asnwered', async function (assert) {
    await visit('/finish');

    assert.equal(currentURL(), '/questionnaires');
  });
});
