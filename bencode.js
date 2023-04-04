class Bencode {

    pos = 0;

    constructor(buf){
        this.buf = buf;
    }

    decode(){
        let prefix = this.buf[this.pos];

        if(prefix === 105){
            return this.integer();
        }else if (prefix === 100){
            return this.map();
        }else if (prefix === 108){
            return this.list();
        }else if (prefix >= 48 && prefix <= 57){
            return this.string();
        }else{
            throw Error('Invalid format');
        }
    }

    integer(){
        this.pos++;
        let val = 0;
        while(this.buf[this.pos] !== 101){
            let c = this.buf[this.pos++];
            if(c < 48 || c > 57){
                throw Error('Invalid number');
            }
            val = val * 10 + (c - 48);
        }
        ++this.pos;
        return val;
    }

    string(){
        let length = 0;
        while(this.buf[this.pos] != 58){
            let c = this.buf[this.pos++];
            if(c < 48 || c > 57){
                throw Error('Invalid number');
            }

            length = length*10+(c-48);
        }
        let value = this.buf.subarray(this.pos+1, this.pos+1+length);

        this.pos += length+1;
        return new TextDecoder().decode(value);
    }

    list(){
        this.pos++;
        let list = [];
        while(this.buf[this.pos] !== 101){
            list.push(this.decode());
        }

        ++this.pos;
        return list;
    }

    map(){
        ++this.pos;
        let dict = {};
        while(this.buf[this.pos] !== 101){
            let key = this.string().toString();
            let value = this.decode();
            dict[key] = value;
        }

        ++this.pos;
        return dict;
    }
}