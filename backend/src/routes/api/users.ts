import { Router } from 'express';
import { check } from 'express-validator';
import { register } from '../../controller';

const router = Router();

router.post(
  '/register',
  [
    check('nickname', 'Nickname is required').not().isEmpty(),
    check('address', 'Wallet address is required').not().isEmpty(),
  ],
  register
);

module.exports = router;
