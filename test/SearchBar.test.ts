import { render, fireEvent } from '@testing-library/vue';
import SearchBar from '@/components/SearchBar.vue';
import { describe, expect, it } from 'vitest';

describe('SearchBar', () => {
  it('emits "search" event with input value on submit', async () => {
    const { getByPlaceholderText, getByRole, container, emitted } = render(SearchBar);

    const input = getByPlaceholderText('Enter city name') as HTMLInputElement;
    const dateInput = container.querySelector('input[type="date"]') as HTMLInputElement;
    await fireEvent.update(input, 'Paris');
    await fireEvent.update(dateInput, '2024-12-01');
    const button = getByRole('button', { name: /search/i });
    await fireEvent.click(button);

    expect(emitted()['search']).toBeTruthy();
    expect(emitted().search[0]).toEqual(['Paris', '2024-12-01']);
  });

  it('does not emit if input is empty or only spaces', async () => {
    const { getByPlaceholderText, getByRole, emitted } = render(SearchBar);

    const input = getByPlaceholderText('Enter city name') as HTMLInputElement;
    await fireEvent.update(input, '   ');

    const button = getByRole('button', { name: /search/i });
    await fireEvent.click(button);

    expect(emitted().search).toBeUndefined();
  });
});
