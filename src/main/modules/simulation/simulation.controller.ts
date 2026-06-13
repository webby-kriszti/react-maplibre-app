import { Controller, Inject } from '@nestjs/common'
import { IpcHandle } from '@doubleshot/nest-electron'
import { SimulationService } from './simulation.service'

@Controller()
export class SimulationController {
  constructor(@Inject(SimulationService) private readonly simulationService: SimulationService) {}

  @IpcHandle('sim:start')
  start(): Promise<unknown> {
    return this.simulationService.sendCommand('start')
  }

  @IpcHandle('sim:stop')
  stop(): Promise<unknown> {
    return this.simulationService.sendCommand('stop')
  }
}
