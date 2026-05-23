import { AgentRouteInput, AgentRouteResult } from './types';
import { generalAgent } from '../agents/general/general.agent';
import { maktabahAgent } from '../agents/maktabah-syamilah/maktabah.agent';

export class AgentRouterService {
  async routeQuestion(input: AgentRouteInput): Promise<AgentRouteResult> {
    const agent = input.agent || 'general';

    if (agent === 'maktabah_syamilah') {
      return maktabahAgent.handle(input);
    }

    return generalAgent.handle(input);
  }

  async *streamQuestion(input: AgentRouteInput): AsyncGenerator<any, void, unknown> {
    const agent = input.agent || 'general';

    if (agent === 'maktabah_syamilah' && maktabahAgent.stream) {
      yield* maktabahAgent.stream(input);
      return;
    }

    if (generalAgent.stream) {
      yield* generalAgent.stream(input);
    }
  }
}

export const agentRouter = new AgentRouterService();
