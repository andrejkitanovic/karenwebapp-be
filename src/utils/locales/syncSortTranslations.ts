import * as fs from 'fs';

// FUNCTIONS:
import syncTranslations from './syncTranslations';
import sortTranslations from './sortTranslations';

// CONSTANTS:
const translationsDir = 'src/locales';
const defaultTranslationsFileName = 'en.json';
const defaultTranslationFile = `${translationsDir}/${defaultTranslationsFileName}`;

/**
 * Synchronize and sort all translations files
 */
function sortAndSyncTranslations() {
	let defaultTranslations = fs.readFileSync(defaultTranslationFile, 'utf8');
	defaultTranslations = JSON.parse(defaultTranslations);

	// Get all file names from 'src/translations'
	fs.readdir(translationsDir, (err, files) => {
		if (err) throw err;

		try {
			// eslint-disable-next-line
			files.forEach((fileName: string) => {
				if (!fileName.endsWith('.json')) return true;

				const fileSrc = `${translationsDir}/${fileName}`;
				let translations = null;

				if (fileName === defaultTranslationsFileName) {
					translations = defaultTranslations;
				} else {
					let translationsFile = fs.readFileSync(fileSrc, 'utf8');
					translationsFile = JSON.parse(translationsFile);
					translations = syncTranslations(defaultTranslations, translationsFile);
				}

				const sortedTranslations = sortTranslations(translations);
				const stringifiedTranslation = JSON.stringify(sortedTranslations, null, 2);

				fs.writeFileSync(fileSrc, stringifiedTranslation);
			});

			// eslint-disable-next-line
			console.log('\x1b[32m', 'Completed!');
		} catch (err) {
			// eslint-disable-next-line

			if (typeof err === 'string') {
				throw new Error(err);
			} else throw new Error('Error occured');
		}
	});
}

sortAndSyncTranslations();
