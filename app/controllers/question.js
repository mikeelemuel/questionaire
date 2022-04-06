import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { isPresent } from '@ember/utils';

export default class QuestionController extends Controller {
  @service questionnaireHelper;
  @service router;

  @tracked chosen = null;
  @tracked slideFromRight = false;
  @tracked slideFromLeft = false;
  @tracked error = null;

  get choices() {
    return this.model.choices;
  }

  @action
  selectChoice(selectedChoice) {
    this.model.choices.map((choice) => {
      if (selectedChoice.value === choice.value) {
        choice.selected = true;
        this.chosen = selectedChoice.value;
      } else {
        choice.selected = false;
      }
    });

    return (this.error = null);
  }

  @action
  nextQuestion() {
    let isQuestionAnswered;
    let nextQuestionId;
    const isRequired = this.model.required;

    if (this.isMultipleChoiceQuestionType) {
      isQuestionAnswered = this.model.choices.isAny('selected', true);
    }

    if (isRequired && !isQuestionAnswered) {
      return (this.error = 'You must answer!');
    }

    nextQuestionId = this.questionnaireHelper.getNextQuestionId();

    if (isPresent(this.model.jumps)) {
      let chosen = this.model.jumps.filter((jump) => {
        const conditions = jump.conditions.map((condition) => condition.value);
        const isConditionChose = conditions.includes(this.chosen);
        return isConditionChose;
      });
      nextQuestionId = isPresent(chosen)
        ? chosen[0].destination.id
        : nextQuestionId;
    }

    const routeName = nextQuestionId ? 'question' : 'finish';

    this.slideFromRight = true;
    this._resetSlidingVariables();

    if (nextQuestionId) {
      return this.router.transitionTo(routeName, nextQuestionId);
    }

    return this.router.transitionTo(routeName);
  }

  @action
  previousQuestion() {
    const previousQuestionId = this.questionnaireHelper.getPreviousQuestionId();

    this.slideFromLeft = true;
    this._resetSlidingVariables();

    if (previousQuestionId) {
      this.router.transitionTo('question', previousQuestionId);
    }
  }

  _resetSlidingVariables() {
    later(
      this,
      function () {
        this.slideFromRight = false;
        this.slideFromLeft = false;
      },
      500
    );
  }
}
