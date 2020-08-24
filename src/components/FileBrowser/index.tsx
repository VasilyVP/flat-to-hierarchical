import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { TreeView, TreeItem } from '@material-ui/lab'
import sampleData from '../../data/SampleData.json'

type sampleDataElT = {
    name: string,
    path: string,
    size: number,
    createdOn: number,
    url: null | string,
    fileType: string,
    itemId: number,
    parentId: number,
    children?: sampleDataElT[]
}

type sampleDataT = sampleDataElT[];

function transformFlatToIe(data: sampleDataT) {
    function transform(child: sampleDataElT, childIndex: number, src: sampleDataT, rootSrc = src) {
        src.every((el, i, src2) => {
            if (child.parentId === el.itemId) {
                if (!src2[i].children) src2[i].children = [];

                (src2[i].children as sampleDataT).push(child);

                delete rootSrc[childIndex];
                return false;
            }

            if (src2[i].children) transform(child, childIndex, src2[i].children as sampleDataT, rootSrc);

            return true;
        });
    }

    data.forEach((current, index, src) => {
        transform(current, index, src);
    });

    return data.filter(el => el || null);
}

const useStyles = makeStyles({
    root: {
        height: 110,
        flexGrow: 1,
        maxWidth: 400,
    },
});

export default () => {
    const classes = useStyles();
    const [filesData, setFilesData] = useState([] as sampleDataT);

    useEffect(() => {
        setFilesData(transformFlatToIe(sampleData as sampleDataT));
    }, []);

    const renderTree = (nodes: sampleDataT) => {
        return nodes.map((node, i) => (
            <TreeItem key={node.itemId} nodeId={String(node.itemId)} label={node.name}>
                {Array.isArray(node.children) ? renderTree(node.children) : null}
            </TreeItem>
        ));
    };

    return (
        <>
            <Box my={1}>Flat to hierarchical files structure</Box>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpanded={['root']}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {renderTree(filesData)}
            </TreeView>
        </>
    )
}