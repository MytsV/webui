import { withAuthenticatedSessionRoute } from '@/lib/infrastructure/auth/session-utils';
import { ListDIDParentsControllerParameters } from '@/lib/infrastructure/controller/list-did-parents-controller';
import appContainer from '@/lib/infrastructure/ioc/container-config';
import CONTROLLERS from '@/lib/infrastructure/ioc/ioc-symbols-controllers';
import { BaseController } from '@/lib/sdk/controller';
import { NextApiRequest, NextApiResponse } from 'next';

async function listDIDParents(req: NextApiRequest, res: NextApiResponse, rucioAuthToken: string) {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    const { scope, name } = req.query as { scope: string; name: string };

    if (!scope || !name) {
        res.status(400).json({ error: 'Missing scope or name parameter' });
        return;
    }

    const controllerParameters: ListDIDParentsControllerParameters = {
        response: res,
        rucioAuthToken: rucioAuthToken,
        scope: scope,
        name: name,
    };

    const controller = appContainer.get<BaseController<ListDIDParentsControllerParameters, void>>(CONTROLLERS.LIST_DID_PARENTS);
    await controller.execute(controllerParameters);
}

export default withAuthenticatedSessionRoute(listDIDParents);
