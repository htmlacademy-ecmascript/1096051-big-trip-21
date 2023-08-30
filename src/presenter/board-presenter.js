import TripSortsView from '../view/trip-sorts-view.js';
import TripListView from '../view/trip-list-view.js';
import TripItemView from '../view/trip-item.js';
import TripItemEditView from '../view/trip-item-edit.js';
import BoardView from '../view/board-view.js';
import TripListEmptyView from '../view/trip-list-empty-view.js';
import { render, replace } from '../framework/render.js';
export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #newPointModel = null;
  #destinationsModel = null;
  #boardPoints = null;
  #boardComponent = new BoardView();
  #tripListComponent = new TripListView();

  constructor({boardContainer, pointsModel, newPointModel, destinationsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#newPointModel = newPointModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#render();
  }

  #render() {
    const destinationsNames = this.#destinationsModel.names;
    render(this.#boardComponent, this.#boardContainer);

    if (!this.#boardPoints.length) {
      render(new TripListEmptyView, this.#boardComponent.element);
    } else {
      render(new TripSortsView(), this.#boardComponent.element);
      render(this.#tripListComponent, this.#boardComponent.element);
      this.#boardPoints.forEach((point) => this.#renderPoint(point, destinationsNames));
    }
  }

  #renderPoint(point, destinationsNames) {
    const closeForm = () => {
      replaceFormToCard();
      window.removeEventListener('keydown', escKeydownHandler);
    };

    const openForm = () => {
      replaceCardToForm();
      window.addEventListener('keydown', escKeydownHandler);
    };

    const pointComponent = new TripItemView({
      point,
      onArrowClick: openForm
    });

    const pointEditComponent = new TripItemEditView({
      point,
      destinationsNames,
      onFormSubmit: closeForm,
      onArrowClick: closeForm
    });

    function escKeydownHandler (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        window.removeEventListener('keydown', escKeydownHandler);
      }
    }


    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#tripListComponent.element);
  }
}