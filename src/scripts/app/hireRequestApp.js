import HireRequestController from "../controllers/hireRequest";
import HireRequestView from "../views/hireRequest";
import HireRequestModel from "../models/hireRequest";

const HireApp = new HireRequestController(
  new HireRequestModel(),
  new HireRequestView(),
);

HireApp.callViewHandler();
