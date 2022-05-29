const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    it('contains a `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });
    it('starts with genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });
    it('added a new block to the block chain', () => {
        const newData = 'foo bar';
        blockchain.addBlock({ data: newData });
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
    });
    // New Block chain validation
    describe('isValidChain()', () => {
        describe('when the chain dose not start with the genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = { data: 'fake-genesis' };

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });

        describe('when the chain start with the genesis block and has multiple blocks', () => {
            beforeEach(() => {
                blockchain.addBlock({ data: 'Beer' });
                blockchain.addBlock({ data: 'Boy' });
                blockchain.addBlock({ data: 'Baby' });
            });

            describe('and a last hash reference has changed', () => {
                it('returns false', () => {
                    // Changing a field in new block chain
                    blockchain.chain[2].lastHash = 'Broken-Chain';
                    // 
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('when a chain contains a block with invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].data = 'correpted-data';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('and a chain that dose not contain any invalid blocks', () => {
                it('returns true', () => {
                   console.log(expect(Blockchain.isValidChain(blockchain.chain)).toBe(true));
                });
            });
        });
    });
});
