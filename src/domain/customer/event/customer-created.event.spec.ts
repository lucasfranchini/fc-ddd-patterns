import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-when-address-changes.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2-when-customer-is-created.handler";

describe("CustomerCreatedEvent unit tests", () => {
  it("should create a customer created event", () => {
    const customer = new Customer("123", "John");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    expect(customerCreatedEvent.dataTimeOccurred).toBeInstanceOf(Date);
    expect(customerCreatedEvent.eventData).toEqual(customer);
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const customer = new Customer("123", "John");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);
    const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
    const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();

    jest.spyOn(enviaConsoleLog1Handler, "handle");
    jest.spyOn(enviaConsoleLog2Handler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);

    eventDispatcher.notify(customerCreatedEvent);

    expect(enviaConsoleLog1Handler.handle).toHaveBeenCalled();
    expect(enviaConsoleLog2Handler.handle).toHaveBeenCalled();
  });
});
