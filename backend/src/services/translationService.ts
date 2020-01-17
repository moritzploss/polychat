import { Translate } from '@google-cloud/translate/build/src/v2';
import { logger } from '../logging';

class TranslationService {
  translationClient: Translate;

  constructor() {
    this.translationClient = new Translate({
      projectId: process.env.GOOGLE_PROJECT_ID,
      key: process.env.GOOGLE_KEY,
    });
  }

  translateString = async (string: string, targetLanguage = 'en'): Promise<string> => {
    try {
      const [translation] = await this.translationClient.translate(string, targetLanguage);
      return translation;
    } catch (error) {
      logger.error(error);
      return '';
    }
  };
}

const translationService = new TranslationService();

export { TranslationService, translationService };
