import { replace, render, remove } from '../framework/render.js';
import { RenderPosition } from '../render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #infoContainer = null;
  #tripInfoComponent = null;

  #pointsModel = null;
  #filterModel = null;

  constructor({ pointsModel, infoContainer }) {
    this.#pointsModel = pointsModel;
    this.#infoContainer = infoContainer;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points () {
    return this.#pointsModel.points;
  }

  init () {
    this.#renderInfo();
  }

  #handleModelEvent = () => {
    this.init();
  };

  #renderInfo () {
    const prevInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView({
      points: this.points
    });

    if(prevInfoComponent === null) {
      render(this.#tripInfoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }
}
