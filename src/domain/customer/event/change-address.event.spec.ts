import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import ChangeAddressEvent from "./change-address.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-when-address-changes.handler";
import EnviaConsoleLogHandler from "./handler/envia-console-log1-when-customer-is-created.handler copy";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2-when-customer-is-created.handler";

describe("CustomerCreatedEvent tests", () => {
  it("should create a customer created event", () => {
    const customer = new Customer("123", "John");
    const customerCreatedEvent = new ChangeAddressEvent(customer);

    expect(customerCreatedEvent.dataTimeOccurred).toBeInstanceOf(Date);
    expect(customerCreatedEvent.eventData).toEqual(customer);
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const customer = new Customer("123", "John");
    const address = new Address("Street 1", 123, "Zip", "City");
    customer.changeAddress(address);
    const changeAddressEvent = new ChangeAddressEvent(customer);
    const enviaConsoleLogHandler = new EnviaConsoleLogHandler();

    jest.spyOn(enviaConsoleLogHandler, "handle");

    eventDispatcher.register("ChangeAddressEvent", enviaConsoleLogHandler);

    eventDispatcher.notify(changeAddressEvent);

    expect(enviaConsoleLogHandler.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        eventData: customer,
      })
    );
  });
});
