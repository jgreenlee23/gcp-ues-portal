import { Injectable } from '@angular/core';
// import { BigQuery } from '@google-cloud/bigquery';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { gapi } from 'gapi-client';

// Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query

@Injectable()
export class BigQueryService {

  // private bigquery = new BigQuery({
  //   projectId: projectId,
  // });

  private projectId = "siem-prototype";
  private bqOpts = {
    'useLegacySql': false, // Use standard SQL syntax for queries.
  };

  constructor() {
    gapi.client.init({
      'apiKey': 'YOUR_API_KEY',
      // clientId and scope are optional if auth is not required.
      'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
      'scope': 'profile',
    }).then(function() {
      // 3. Initialize and make the API request.
      return gapi.client.request({
        'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
      })
    }).then(function(response) {
      console.log(response.result);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  }

  public runQuery(query: string) {
   var request = gapi.client.bigquery.jobs.query({
      'projectId': this.projectId,
      'timeoutMs': '30000',
      'query': query
    });

    request.execute(function(response) {
        console.log(response);
    });
  }

  public listProjects() {
    var request = gapi.client.bigquery.projects.list();

    request.execute(function(response) {
      console.log(response);
    });
  }

  public listDatasets(projectId = 'siem-prototype') {
    var request = gapi.client.bigquery.datasets.list({
      'projectId': projectId
    });

    request.execute(function(response) {
      console.log(response);
    });

    // Lists all datasets in the specified project
    // return this.bigquery
    //   .getDatasets()
    //   .then(results => {
    //     const datasets = results[0];
    //     console.log('Datasets:');
    //     datasets.forEach(dataset => console.log(dataset.id));
    //   })
    //   .catch(err => {
    //     console.error('ERROR:', err);
    //   });
  }

  // handleError: custom error handler for http operations
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure (Google Cloud)
      console.error(error);

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  // private log(message: string) {
  //   this.messageService.add('HeroService: ' + message);
  // }
}
