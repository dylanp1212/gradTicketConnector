import {Body, Controller, Get, Path, Post, Route, SuccessResponse} from 'tsoa'
import {Message, NewMessage, UUID} from '.'
import {MessageService} from './service'

@Route('message')
export class MessageController extends Controller {
  @Get('/')
  public async getAllMessages(): Promise<Message[]> {
    return new MessageService().getAllMessages();
  }

  @SuccessResponse(201, 'Created')
  @Post()
  public async createMessage(@Body() body: NewMessage): Promise<Message> {
    this.setStatus(201)
    return new MessageService().createMessage(body)
  }

  @Get('convo/{member1}/{member2}')
  public async getConvo(
    @Path() member1: UUID,
    @Path() member2: UUID,
  ): Promise<Message[]> {
    return new MessageService().getConvo(member1, member2)
  }
}
