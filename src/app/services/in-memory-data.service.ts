import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let companies = [];
    const alpha = '0ABCDEFGHIJKL';
    let n = 5;
    for( let i = 1; i<=n; i++ ){
      companies.push({
        id: i,
        name: `Company ${alpha[i]}`,
        description: 'Lorem ispum',
        contacts: [],
        financials: [],
        status: 0
      });
    }
    const db = { company: companies };
    if( true )
      console.log('Returning in-memory database with',
        companies.length, 'companies: ', db);
    return db;
  }
}
