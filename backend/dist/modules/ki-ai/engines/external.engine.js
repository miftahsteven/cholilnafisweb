"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalEngine = exports.ExternalEngine = void 0;
const apify_client_1 = require("apify-client");
// Inisialisasi Apify Client
const apifyClient = new apify_client_1.ApifyClient({
    token: process.env.APIFY_TOKEN || '',
});
class ExternalEngine {
    /**
     * Search external knowledge from MUI and NU domains via Apify google-search-scraper
     */
    async search(query, limit = 3) {
        if (!process.env.APIFY_TOKEN) {
            console.warn('APIFY_TOKEN is not set. Skipping external retrieval.');
            return [];
        }
        try {
            // Modify query to only search specified domains, prioritizing MUI news
            const siteFilter = '(site:mui.or.id/baca/berita OR site:mui.or.id OR site:nu.or.id)';
            const searchQuery = `${query} ${siteFilter}`;
            // Memanggil Apify Actor 'apify/google-search-scraper'
            // Dokumentasi: https://apify.com/apify/google-search-scraper
            const run = await apifyClient.actor('apify/google-search-scraper').call({
                queries: searchQuery,
                maxPagesPerQuery: 1,
                resultsPerPage: limit,
                countryCode: 'id',
                languageCode: 'id',
            });
            const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();
            const results = [];
            for (const item of items) {
                // Apify google-search-scraper mengembalikan 'organicResults'
                const organicResults = item.organicResults;
                if (organicResults && organicResults.length > 0) {
                    for (const res of organicResults.slice(0, limit)) {
                        let sourceType = 'external';
                        if (res.url?.includes('mui.or.id'))
                            sourceType = 'mui';
                        else if (res.url?.includes('nu.or.id'))
                            sourceType = 'nu';
                        results.push({
                            title: res.title || '',
                            snippet: res.description || '',
                            url: res.url || '',
                            sourceType,
                        });
                    }
                }
            }
            return results;
        }
        catch (error) {
            console.error('External engine search error:', error);
            return [];
        }
    }
}
exports.ExternalEngine = ExternalEngine;
exports.externalEngine = new ExternalEngine();
