import EmberRouter from '@ember/routing/router';
import config from 'questionaire/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('questionnaires');
  this.route('questionnaire', { path: '/questionnaires/:questionnaire_id' });
  this.route('question', { path: '/questionnaires/question/:id' });
  this.route('finish');
  this.route('not-found', { path: '/*path' });
});
