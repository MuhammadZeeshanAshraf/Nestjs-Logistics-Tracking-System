import { instanceToPlain } from 'class-transformer';

export async function entityAssembler<T, B>(body: B, entity: T): Promise<T> {
  const data: { [key: string]: string | number } = instanceToPlain(body);
  for (const key of Object.keys(data)) {
    entity[key] = data[key];
  }
  return entity;
}
