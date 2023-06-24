import { Router } from 'express';
import signIn from '@/router/signIn';
import signUp from '@/router/signUp';

const router = Router();

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);

export default router;
