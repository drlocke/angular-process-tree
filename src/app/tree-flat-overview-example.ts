import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface ProcessNode {
  name: string;
  duration: string;
  color: string;
  children?: ProcessNode[];
}

const TREE_DATA: ProcessNode[] = [
  {
    name: 'Prozess A',
    duration: '333',
    color: 'white',
    children: [
      {
        name: 'Prozess A.1',
        duration: '300',
        color: 'white',
        children: [
          { name: 'Prozess A.1.1', duration: '150', color: 'white' },
          { name: 'Prozess A.1.2', duration: '150', color: 'white' },
        ],
      },
      { name: 'Prozess A.2', duration: '30', color: 'white' },
    ],
  },
  {
    name: 'Prozess B',
    duration: '7350',
    color: '#FF7F7F',
    children: [
      {
        name: 'Prozess B.1',
        duration: '1050',
        color: 'white',
      },
      {
        name: 'Prozess B.2',
        duration: '1200',
        color: 'white',
      },
      {
        name: 'Prozess B.3',
        duration: '5100',
        color: '#FF7F7F',
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  duration: string;
  color: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'tree-flat-overview-example',
  templateUrl: 'tree-flat-overview-example.html',
  styleUrls: ['tree-flat-overview-example.css'],
})
export class TreeFlatOverviewExample {
  private _transformer = (node: ProcessNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      duration: msToHumandReadable(Number(node.duration)),
      color: node.color,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getNodeColor(node: ProcessNode): string {
    return node.color;
  }

  getNodeColorText(node: ProcessNode): string {
    return 'black';
  }
}

function msToHumandReadable(duration: number) {
  const portions: string[] = [];

  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(duration / msInHour);
  if (hours > 0) {
    portions.push(hours + 'h');
    duration = duration - hours * msInHour;
  }

  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(duration / msInMinute);
  if (minutes > 0) {
    portions.push(minutes + 'm');
    duration = duration - minutes * msInMinute;
  }

  const seconds = Math.trunc(duration / 1000);
  if (seconds > 0) {
    portions.push(seconds + 's');
  }

  const millisec = Math.trunc(duration - seconds * 1000);
  if (millisec > 0) {
    portions.push(millisec + 'ms');
  }

  return portions.join(' ');
}

/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
