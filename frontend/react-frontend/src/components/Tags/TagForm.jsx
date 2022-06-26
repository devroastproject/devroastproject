import React, {useState, useEffect} from "react";
import Loading from "../Utils/Loading";
import Tag from "./Tag";

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const TagForm = ({tags, assignTags}) => {
   
    const [searchTerm, setSearchTerm] = useState('')
    const [matchTags, setMatchTags] = useState(tags)

    useEffect(() => {
        let matched = matchTags.map((tag) => { tag.searched = tag.tagname.includes(searchTerm) && searchTerm; return tag })
        setMatchTags(matched)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])

    return(
        <Grid container spacing={1} className="TagList">
            <TextField variant='outlined' type="text" name="tagSearch" label='Tags' size='small' onChange={e => setSearchTerm(e.target.value)}/>
        {
            matchTags.length > 0 ? 
                // display tags that are either assigned or are being searched for
                matchTags.map((tag) => tag.assigned || tag.searched ? 
                    <Grid key={tag.id} item>
                        <Tag tag={tag} onClick={() => assignTags(tag)} clickable={true} assigned={tag.assigned} /> 
                    </Grid>
                : null)
            : <Loading />
        } 
        </Grid>
    )
};

export default TagForm;