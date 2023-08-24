import TripSortsView from '../view/trip-sorts-view.js';
import TripListView from '../view/trip-list-view.js';
import TripItemView from '../view/trip-item.js';
import NewPoint from '../view/new-point-view.js';
import BoardView from '../view/board-view.js';
import { render, RenderPosition } from '../render.js';
export default class BoardPresenter {
  boardComponent = new BoardView();
  tripListComponent = new TripListView();

  constructor({boardContainer, pointsModel, newPointModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.newPointModel = newPointModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(this.boardComponent, this.boardContainer);
    render(new TripSortsView(), this.boardComponent.getElement());
    render(this.tripListComponent, this.boardComponent.getElement());
    render(new NewPoint(this.newPointModel.getData()), this.tripListComponent.getElement(), RenderPosition.AFTERBEGIN);

    this.boardPoints.forEach((point) => render(new TripItemView({point}), this.tripListComponent.getElement()));
  }
}
