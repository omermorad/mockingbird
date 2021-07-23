import { Request, Response, Router } from 'express';
import { Repository } from 'typeorm';
import { MockFactory } from 'mockingbird-ts';
import { User } from './interface/user.interface';
import { UserEntity } from './entity/user.entity';

export function UserController(router: Router, repository: Repository<User>): Router {
  router.get('/users', async (req: Request, res: Response) => {
    const users = await repository.find();

    res.json(users);
  });

  router.post('/users', async (req: Request, res: Response) => {
    const user = await repository.create(req.body);
    const result = await repository.save(user);

    return res.json(result);
  });

  router.get('/users/random', async (req: Request, res: Response) => {
    const newUser = MockFactory(UserEntity).one();
    const user = await repository.create(newUser);
    const result = await repository.save(user);

    res.json(result);
  });

  return router;
}
