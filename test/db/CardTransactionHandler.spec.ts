import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import CardTransactionHandler from '../../src/db/CardTransactionHandler';
import { ERRORS } from '../../src/errors/errors';

describe('CardTransactionHandler', () => {
  let cardHandler: CardTransactionHandler;
  const testCardId = 'test_card';

  beforeEach(() => {
    // Get the singleton instance before each test
    cardHandler = CardTransactionHandler.getInstance();
    // Reset balance for test card before each test
    cardHandler.setBalance(testCardId, 100);
  });

  it('should recharge the card with the specified amount', () => {
    cardHandler.rechargeCard(testCardId, 50);
    const balance = cardHandler.getBalance(testCardId);
    expect(balance).to.equal(150);
  });

  it('should throw an error when recharging a non-existent card', () => {
    const invalidCardId = 'invalid_card';
    expect(() => cardHandler.rechargeCard(invalidCardId, 50))
      .to.throw(Error, ERRORS.INVALID_CARD_ID(invalidCardId));
  });

  it('should retrieve the correct balance for an existing card', () => {
    const balance = cardHandler.getBalance(testCardId);
    expect(balance).to.equal(100);
  });

  it('should throw an error when retrieving balance for a non-existent card', () => {
    const invalidCardId = 'invalid_card';
    expect(() => cardHandler.getBalance(invalidCardId))
      .to.throw(Error, ERRORS.INVALID_CARD_ID(invalidCardId));
  });

  it('should return true if the card has sufficient balance', () => {
    const hasBalance = cardHandler.hasSufficientBalance(testCardId, 50);
    expect(hasBalance).to.be.true;
  });

  it('should return false if the card does not have sufficient balance', () => {
    const hasBalance = cardHandler.hasSufficientBalance(testCardId, 200);
    expect(hasBalance).to.be.false;
  });

  it('should deduct the specified amount from the card when balance is sufficient', () => {
    const result = cardHandler.chargeCard(testCardId, 50);
    const balance = cardHandler.getBalance(testCardId);
    expect(result).to.be.true;
    expect(balance).to.equal(50);
  });

  it('should not deduct the amount if balance is insufficient', () => {
    const result = cardHandler.chargeCard(testCardId, 200);
    const balance = cardHandler.getBalance(testCardId);
    expect(result).to.be.false;
    expect(balance).to.equal(100);
  });

  it('should throw an error when charging a non-existent card', () => {
    const invalidCardId = 'invalid_card';
    expect(() => cardHandler.chargeCard(invalidCardId, 50))
      .to.throw(Error, ERRORS.INVALID_CARD_ID(invalidCardId));
  });
});
