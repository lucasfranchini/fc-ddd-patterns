import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import ChangeAddressEvent from "../change-address.event";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLog1Handler
  implements EventHandlerInterface<ChangeAddressEvent>
{
  handle(event: ChangeAddressEvent): void {
    const { id, name, Address } = event.eventData;
    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${Address}`
    );
  }
}
