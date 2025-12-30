import { getPayload } from 'payload'
import config from '../payload.config'
import { seed } from './index'
import * as dotenv from 'dotenv'

dotenv.config()

const run = async () => {
  const payload = await getPayload({ config })

  payload.logger.info('Starting seed...')
  try {
    await seed(payload)
    payload.logger.info('Seed completed successfully.')
  } catch (error) {
    payload.logger.error('Seed failed.')
    payload.logger.error(error)
    process.exit(1)
  }

  process.exit(0)
}

run()
