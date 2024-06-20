import { Test, TestingModule } from '@nestjs/testing';
import { LinkService } from './link.service';
import * as RedisMock from 'ioredis-mock';

describe('LinkService', () => {
  let service: LinkService;
  let redis: RedisMock.Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkService,
        {
          provide: 'REDIS',
          useFactory: () => {
            redis = new RedisMock();
            return redis;
          },
        },
      ],
    }).compile();

    service = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and retrieve a link', async () => {
    const value = 'test_value';
    const id = await service.createLink(value);
    expect(id).toBeDefined();

    const retrievedValue = await service.getLink(id);
    expect(retrievedValue).toBe(value);
  });

  it('should throw an error if link is already used', async () => {
    const value = 'test_value';
    const id = await service.createLink(value);
    await service.getLink(id);

    await expect(service.getLink(id)).rejects.toThrow(
      'Link not found or already used',
    );
  });
});
