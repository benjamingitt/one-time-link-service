import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LinkService {
  constructor(@Inject('REDIS') private readonly redis: Redis) {}

  async createLink(value: string): Promise<string> {
    const id = uuidv4();
    await this.redis.set(id, value, 'EX', 3600); // Ссылка активна в течение 1 часа
    return id;
  }

  async getLink(id: string): Promise<string> {
    const value = await this.redis.get(id);
    if (!value) {
      throw new Error('Link not found or already used');
    }
    await this.redis.del(id);
    return value;
  }
}
